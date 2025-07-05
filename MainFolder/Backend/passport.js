const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const pool = require('./db');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;

        const existingUser = await pool.query(
          'SELECT * FROM users WHERE email = $1',
          [email]
        );

        if (existingUser.rows.length > 0) {
          return done(null, existingUser.rows[0]);
        }

        const newUser = await pool.query(
          'INSERT INTO users (username, email, role) VALUES ($1, $2, $3) RETURNING *',
          [name, email, 'job_seeker'] // default role
        );

        return done(null, newUser.rows[0]);
      } catch (err) {
        console.error('Error in GoogleStrategy:', err);
        return done(err, null);
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await pool.query('SELECT * FROM users WHERE id = $1', [jwt_payload.id]);

      if (user.rows.length > 0) {
        return done(null, user.rows[0]);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);