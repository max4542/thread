import React, { useEffect, useState } from "react";
import socket from "../../utils/socket";
import apiClient from "../../intercepter/intercepter";
import Sidebar from "./SideBar";
import UsersList from "./UserList";
import ChatWindow from "./ChatWindow";
const {getUserInfoFromToken}= require("../../utils/jwtTokenUtils")
const Chat = () => {
  const [users, setUsers] = useState([]);
  const [details, setUsersDetails] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    if (token) {  
      socket.on("userLogin", (details))
      // Cleanup on unmount
      return () => {
        socket.off('userLogin');
      };
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get("/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    socket.emit("getOnlineUsers");
    socket.on("onlineUsersList", (data) => {
      setOnlineUsers(data.users);
    });
    
    socket.on("chatMessage", (data) => {
       console.log(data);
    });

    const details = getUserInfoFromToken();
    setUsersDetails(details);

    return () => {
      socket.off("onlineUsersList");
      socket.disconnect();
    };
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (newMessage && selectedUser && socket) {
      const messageData = {
        senderId: details.id, // Replace with actual user ID
        recipientId: selectedUser.id,
        message: newMessage,
      };
      socket.emit("chatMessage", messageData);
      setNewMessage(""); // Clear message input
    }

  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar />
      <UsersList
        users={users}
        onlineUsers={onlineUsers}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSelectUser={handleSelectUser}
        selectedUser={selectedUser}
        
      />
      <ChatWindow
        selectedUser={selectedUser}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;
