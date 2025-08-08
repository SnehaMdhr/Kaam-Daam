import React, { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const chatInputRef = useRef(null);
  const chatboxRef = useRef(null);
  const sendBtnRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen); // Directly toggle the state
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const chatInput = chatInputRef.current;
    const chatbox = chatboxRef.current;
    const sendChatBtn = sendBtnRef.current;
    let userMessage = null;

    if (!chatInput || !chatbox || !sendChatBtn) return; // Early return if any reference is null

    const inputInitHeight = chatInput.scrollHeight;

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const systemPrompt = `
    You are KaamDaam's AI assistant, created to help students and recruiters on the KaamDaam platform.
    `;

    const createChatLi = (message, type) => {
      const li = document.createElement("li");
      li.classList.add("chat", type);
      const icon =
        type === "incoming"
          ? `<span class="material-symbols-outlined">smart_toy</span>`
          : "";
      li.innerHTML = `${icon}<p>${message}</p>`;
      return li;
    };

    const generateResponse = async (chatElement) => {
      const messageElement = chatElement.querySelector("p");

      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt }, { text: userMessage }],
          },
        ],
      };

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        const reply =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn’t generate a reply.";
        messageElement.textContent = reply.replace(/\*\*(.*?)\*\*/g, "$1");
      } catch (error) {
        messageElement.classList.add("error");
        messageElement.textContent = "Error: " + error.message;
      } finally {
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    };

    const handleChat = () => {
      userMessage = chatInput.value.trim();
      if (!userMessage) return;

      chatInput.value = "";
      chatInput.style.height = `${inputInitHeight}px`;

      chatbox.appendChild(createChatLi(userMessage, "outgoing"));
      chatbox.scrollTop = chatbox.scrollHeight;

      setTimeout(() => {
        const botLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(botLi);
        chatbox.scrollTop = chatbox.scrollHeight;
        generateResponse(botLi);
      }, 600);
    };

    chatInput.addEventListener("input", () => {
      chatInput.style.height = `${inputInitHeight}px`;
      chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
      }
    });

    sendChatBtn.addEventListener("click", handleChat);
  }, []);

  return (
    <>
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>

      <div className={`chatbot ${isOpen ? "open" : ""}`}>
        <header>
          <h2>Chatbot</h2>
          <span
            className="close-btn material-symbols-outlined"
            onClick={closeChatbot}
          >
            close
          </span>
        </header>
        <ul className="chatbox" ref={chatboxRef}>
          <li className="chat incoming">
            <span className="material-symbols-outlined">smart_toy</span>
            <p>
              Hi there <br />
              How can I help you today?
            </p>
          </li>
        </ul>
        <div className="chat-input">
          <textarea
            placeholder="Enter a message..."
            spellCheck="false"
            required
            ref={chatInputRef}
          ></textarea>
          <span
            id="send-btn"
            className="material-symbols-rounded"
            ref={sendBtnRef}
          >
            send
          </span>
        </div>
      </div>
    </>
  );
};

export default Chatbot;