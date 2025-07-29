from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 🔐 Load environment variables from .env file
load_dotenv()

# 🚀 Initialize FastAPI app
app = FastAPI()

# ✅ Allow frontend connection (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # adjust to your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔗 Database connection helper
def get_connection():
    try:
        return psycopg2.connect(
            host=os.getenv("PGHOST"),
            database=os.getenv("PGDATABASE"),
            user=os.getenv("PGUSER"),
            password=os.getenv("PGPASSWORD"),
            port=os.getenv("PGPORT"),
            cursor_factory=RealDictCursor
        )
    except Exception as e:
        raise Exception(f"Database connection failed: {e}")

# 🔤 Clean input values
def safe_join(value):
    if isinstance(value, (list, tuple)):
        return " ".join(str(v).strip() for v in value if v)
    elif isinstance(value, str):
        return " ".join(value.split(","))
    return ""

# 🎯 Main Recommendation Endpoint
@app.get("/recommend/{student_id}")
async def recommend(student_id: int):
    conn = None
    cursor = None

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # 🧑‍🎓 Fetch student data
        cursor.execute("SELECT skills, category FROM users WHERE id = %s", (student_id,))
        student = cursor.fetchone()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

        student_category = safe_join(student["category"]).strip().lower()
        student_text = f"{safe_join(student['skills'])} {student_category}".strip()

        if not student_text:
            return JSONResponse(content={"message": "No skills or category to recommend"}, status_code=204)

        # 🚫 Jobs already applied to
        cursor.execute("SELECT job_id FROM job_applications WHERE user_id = %s", (student_id,))
        applied_job_ids = {row["job_id"] for row in cursor.fetchall()}

        # 📄 Jobs in same category
        cursor.execute("""
            SELECT id, title, required_skills, category, description, address, company_name
            FROM job_posts
            WHERE LOWER(TRIM(category)) = %s
        """, (student_category,))
        jobs = cursor.fetchall()

        # 🔁 Fallback to all jobs if no matches found
        if not jobs:
            cursor.execute("""
                SELECT id, title, required_skills, category, description, address, company_name
                FROM job_posts
            """)
            jobs = cursor.fetchall()

        # 🧮 Build job list excluding applied jobs
        job_list = []
        for row in jobs:
            if row["id"] in applied_job_ids:
                continue

            combined_text = f"{safe_join(row['required_skills'])} {safe_join(row['category'])} {row.get('description') or ''}"
            job_list.append({
                "job_id": row["id"],
                "title": row["title"],
                "company_name": row.get("company_name", ""),
                "address": row.get("address", ""),
                "combined": combined_text.strip()
            })

        if not job_list:
            return []

        # 🧠 TF-IDF Matching
        texts = [job["combined"] for job in job_list] + [student_text]
        tfidf = TfidfVectorizer(stop_words="english")
        vectors = tfidf.fit_transform(texts)
        similarity = cosine_similarity(vectors[-1], vectors[:-1])[0]

        # 📊 Score jobs
        for i, score in enumerate(similarity):
            job_list[i]["_score"] = round(float(score), 4)

        # 🔝 Return top 5 recommendations
        top_5 = sorted(job_list, key=lambda x: x["_score"], reverse=True)[:5]

        return [
            {
                "job_id": job["job_id"],
                "title": job["title"],
                "company_name": job["company_name"],
                "address": job["address"]
            }
            for job in top_5
        ]

    except psycopg2.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
