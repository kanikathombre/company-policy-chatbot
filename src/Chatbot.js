import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [feedback, setFeedback] = useState(0);

  // Display greeting message when the component mounts
  useEffect(() => {
    const greetingMessage = { sender: "Bot", text: "Hello! How can I assist you with our company policies today?" };
    setMessages([greetingMessage]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim().toLowerCase();

    // Check if the user has typed "end"
    if (userMessage === "end") {
      setMessages([
        ...messages,
        { sender: "User", text: input },
        { sender: "Bot", text: "Thank you for using the Company Policy Chatbot. Have a great day!" }
      ]);
      setIsChatEnded(true);  // Stop further input
      setInput("");  // Clear the input field
      return;
    }

    // Predefined responses for common greetings
    let botResponse;
    if (userMessage === "hi" || userMessage === "hello") {
      botResponse = "Hello! How can I help you with our company policies?";
    } else if (userMessage === "how are you") {
      botResponse = "I'm doing great, thank you! How can I assist you?";
    }

    const newMessages = [
      ...messages,
      { sender: "User", text: input },
    ];

    // If there's a predefined response, use it; otherwise, make an API call
    if (botResponse) {
      setMessages([...newMessages, { sender: "Bot", text: botResponse }]);
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/chat", {
          message: input,
        });
        setMessages([...newMessages, { sender: "Bot", text: response.data.response }]);
      } catch (error) {
        setMessages([...newMessages, { sender: "Bot", text: "Sorry, something went wrong." }]);
      }
    }

    setInput("");  // Clear the input field
  };

  // Function to handle rating selection
  const handleRating = (rating) => {
    setFeedback(rating);
    console.log("User Feedback:", rating); // Here you could send the rating to a backend
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Company Policy Chatbot</div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender === "User" ? "user" : "bot"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      {!isChatEnded && (
        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask about policies or type 'end' to finish..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      )}
      {isChatEnded && (
        <div className="feedback-container">
          <p>Thank you for chatting with us! Please rate your experience:</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${feedback >= star ? "filled" : ""}`}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
