import React from 'react'
import Header  from '../components/headerforemployer'
import Sidebar from '../components/sidebarstudent'
import "./studentmessage.css"

const studentmessage = () => {
  return (
    <div>
        <Header />
        <div className="chat-container">
          <Sidebar />
      {/* Sidebar */}
      <div className="sidebar1">
        <h1>Messages</h1>
        <ul>
          <li>
            <div className="avatar">E</div>
            <div className="user-info">
              <strong>Ethan Harper</strong><br></br>
              <span>Software Engineer</span>
            </div>
          </li>
          <li>
            <div className="avatar">S</div>
            <div className="user-info">
              <strong>Sophia Clark</strong><br></br>
              <span>Data Analyst</span>
            </div>
          </li>
          <li>
            <div className="avatar">L</div>
            <div className="user-info">
              <strong>Liam Foster</strong><br></br>
              <span>UX Designer</span>
            </div>
          </li>
          <li>
            <div className="avatar">O</div>
            <div className="user-info">
              <strong>Olivia Bennett</strong><br></br>
              <span>Product Manager</span>
            </div>
          </li>
          <li>
            <div className="avatar">N</div>
            <div className="user-info">
              <strong>Noah Carter</strong><br></br>
              <span>QA Engineer</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Chat Area */}
      <div className="chat-box">
        <h1>Ethan Harper</h1>
        <div className="messages">
          <div className="message user-message">
            <div className="bubble">
              Hi, I’m really excited about the Software Engineer position at KaamDaam.
              I’ve attached my resume for your review.
            </div>
            <span className="sender">Ethan Harper</span>
          </div>

          <div className="message kaam-message">
            <div className="bubble">
              Hi Ethan, thanks for applying! We’ll review your resume and get back to you soon.
            </div>
            <span className="sender">KaamDaam</span>
          </div>

          <div className="message user-message">
            <div className="bubble">
              Great, I look forward to hearing from you.
            </div>
            <span className="sender">Ethan Harper</span>
          </div>

          <div className="message kaam-message">
            <div className="bubble">
              Hi Ethan, thanks for applying! We’ll review your resume and get back to you soon.
            </div>
            <span className="sender">KaamDaam</span>
          </div>
        </div>

        {/* Input box */}
        <div className="input-box">
          <img src="https://i.imgur.com/4M34hi2.png" alt="logo" />
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default studentmessage
