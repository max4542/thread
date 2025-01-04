import React from "react";

const ChatWindow = ({
  selectedUser,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
    <div className="flex-1 bg-gray-900 w-[165vh]">
      {selectedUser && (
        <div className="border-b border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            Chat with {selectedUser.name}
          </h2>
        </div>
      )}

      <div className="p-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                msg.from === "You"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-700"
              }`}
            >
              <span className="block text-sm font-semibold">{msg.from}</span>
              <span>{msg.text}</span>
              <span className="block text-xs text-gray-400 mt-1">
                {msg.timestamp}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet. Start the conversation!</p>
        )}
      </div>

      {selectedUser && (
        <div className="border-t border-gray-700 p-4 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
