


import { useState, useEffect } from "react";
import "./App.css";

import Histry from "./components/RecentHistry/Histry";
import Chat from "./components/Main/Chat";

const STORAGE_KEY = "Histry";

function App() {
  const [recentHistory, setRecentHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const normalizedHistory = savedHistory
      .filter(Boolean)
      .map((item) => {
        if (typeof item === "string") {
          return {
            id: Date.now() + Math.random(),
            title: item,
            conversation: [],
          };
        }
        return item;
      })
      .sort((a, b) => b.id - a.id);

    setRecentHistory(normalizedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentHistory));
  }, [recentHistory]);

  const saveCurrentConversation = () => {
    if (currentChat.length === 0) return;

    const title = currentChat[0]?.question || "New Chat";
    const conversationKey = JSON.stringify(currentChat);

    const filteredHistory = recentHistory.filter(
      (item) => JSON.stringify(item.conversation) !== conversationKey
    );

    const newEntry = {
      id: Date.now(),
      title,
      conversation: currentChat,
    };

    setRecentHistory([newEntry, ...filteredHistory]);
    setSelectedHistoryId(newEntry.id);
  };

  const clearHistory = () => {
    setRecentHistory([]);
    setCurrentChat([]);
    setSelectedHistoryId(null);
  };

  const startNewChat = () => {
    if (currentChat.length > 0) {
      saveCurrentConversation();
    }
    setCurrentChat([]);
    setSelectedHistoryId(null);
  };

  const handleSelectHistory = (item) => {
    setCurrentChat(item.conversation);
    setSelectedHistoryId(item.id);
  };

  const deleteHistoryItem = (id) => {
    setRecentHistory((prev) => prev.filter((item) => item.id !== id));

    if (selectedHistoryId === id) {
      setCurrentChat([]);
      setSelectedHistoryId(null);
    }
  };

  return (
    <div className="grid grid-cols-5">
      <Histry
        recentHistory={recentHistory}
        selectedHistoryId={selectedHistoryId}
        onSelectHistory={handleSelectHistory}
        onDeleteHistory={deleteHistoryItem}
        onNewChat={startNewChat}
        onClearHistory={clearHistory}
      />

      <Chat
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        onNewChat={startNewChat}
      />
    </div>
  );
}

export default App;
