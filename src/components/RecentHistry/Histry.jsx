import React from "react";
import { Trash2, MessageSquare, Plus } from "lucide-react";

const Histry = ({
  recentHistory,
  selectedHistoryId,
  onSelectHistory,
  onDeleteHistory,
  onNewChat,
  onClearHistory,
}) => {
  return (
    <div className="col-span-1 h-screen bg-[#171717] border-r border-zinc-800 text-white flex flex-col">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between gap-2 mt-3 pt-2.5 flex-col">
        <div>
          <h1 className="text-lg font-semibold tracking-wide font-sans ">
            Recent Chats
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Click a chat to restore the full conversation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNewChat}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800 transition"
          >
            <Plus size={14} /> New Chat
          </button>
          <button
            onClick={onClearHistory}
            className="p-2 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 scrollbar-thin scrollbar-thumb-zinc-700">
        {recentHistory.length === 0 ? (
          <div className="text-center mt-10 text-zinc-500 text-sm">
            No recent chats
          </div>
        ) : (
          recentHistory.map((item) => {
            const isActive = item.id === selectedHistoryId;
            return (
              <div
                key={item.id}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition duration-200 relative ${
                  isActive ? "bg-cyan-600/10 border border-cyan-600" : "hover:bg-zinc-800 "
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectHistory(item)}
                  className="flex-1 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-zinc-700 p-2 rounded-lg ">
                      <MessageSquare size={16}  />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-100 truncate">
                        {item.title || "Untitled Chat"}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {item.conversation.length} message{item.conversation.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteHistory(item.id)}
                  className="p-2 rounded-lg text-zinc-400 hover:bg-red-500/20 hover:text-red-400 transition ml-auto flex-shrink: 0 truncate"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="border-t border-zinc-800 p-4">
        <p className="text-md text-zinc-500 text-center">Dhiru's Dynamo AI</p>
      </div>
    </div>
  );
};

export default Histry;
