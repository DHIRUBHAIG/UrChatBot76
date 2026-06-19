import React, { useState, useRef, useEffect } from "react";
import { API_KEY } from "../../assets/Constant.js";
import ReactMarkdown from "react-markdown";

const Chat = ({ currentChat, setCurrentChat, onNewChat }) => {
  const [question, setQuestion] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [currentChat]);

  async function askQuestion() {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    setQuestion("");
    const currentQuestion = trimmedQuestion;

    try {
      const response = await fetch(

        // "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",

        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",

        // "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",



        // "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: currentQuestion }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiAnswer =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated.";

      setCurrentChat((prev) => [
        ...prev,
        {
          question: currentQuestion,
          answer: aiAnswer,
        },
      ]);
    } catch (error) {
      console.error(error);
      setCurrentChat((prev) => [
        ...prev,
        {
          question: currentQuestion,
          answer: "Something went wrong. Please try again.",
        },
      ]);
    }
  }

  return (
    <div className="col-span-4 bg-zinc-950 h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-900 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-amber-900 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-center gap-10 px-6 py-6 z-10">
        <div >
          <h1 className="text-5xl font-bold text-cyan-600 ">Hello User 👋</h1>
          <p className="text-2xl font-semibold text-amber-500 mt-2">
            {currentChat.length > 0
              ? `Conversation • ${currentChat.length} messages`
              : "Ask Me Anything..."}
          </p>
        </div>

        <button
          onClick={onNewChat}
          className="bg-zinc-900 border border-zinc-700 text-white px-5 py-3 rounded-2xl hover:bg-zinc-800 transition"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {currentChat.length === 0 ? (
            <div className="text-center text-zinc-500 mt-20">
              Start a conversation...
            </div>
          ) : (
            currentChat.map((chat, index) => (
              <div key={index} className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-zinc-700 text-white px-8 py-8 max-w-2xl shadow-lg rounded-tl-3xl rounded-br-3xl rounded-bl-3xl text-2xl shadow-amber-200">
                    {chat.question}
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-700 text-white px-6 py-4 max-w-4xl shadow-lg rounded-tl-3xl rounded-br-3xl rounded-bl-3xl text-2xl shadow-amber-50">
                    <ReactMarkdown>{chat.answer}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))
          )}

          <div ref={chatEndRef}></div>
        </div>
      </div>

      <div className="p-6 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-3xl p-3 shadow-xl">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askQuestion();
                }
              }}
              placeholder="Message Dhiru Dynamo..."
              className="flex-1 bg-transparent text-white placeholder-zinc-500 text-lg px-4 py-2 outline-none"
            />

            <button
              onClick={askQuestion}
              className="bg-cyan-600 hover:bg-cyan-500 active:scale-95 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-2xl"
            >
              Send 🚀
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-zinc-500 text-sm">
              ✨ Dhiru Dynamo can make mistakes. Consider verifying important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
