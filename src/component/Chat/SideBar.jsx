import React from "react";
import {
  FaHome,
  FaComments,
  FaClipboardList,
  FaClock,
  FaEllipsisV,
  FaPlus,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = () => {
  // Retrieve user details from the Redux store
  const user = useSelector((state) => state.auth);
console.log(user);
  return (
    <div className="relative w-20 p-4 flex flex-col space-y-6 border-r border-black">
      <div className="space-y-4">
        {[
          { icon: FaHome, label: "Home" },
          { icon: FaComments, label: "DMs" },
          { icon: FaClipboardList, label: "Activity" },
          { icon: FaClock, label: "Later" },
          { icon: FaEllipsisV, label: "More" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
          >
            <item.icon className="text-white" />
            <span className="text-white text-xs">{item.label}</span>
          </div>
        ))}
      </div>
      {/* Profile and Add Icon */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-y-4">
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <FaPlus className="text-white text-2xl bg-gray-700 rounded-full p-1" />
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          {/* Display user's profile image or a default avatar */}
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="User Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="text-white text-4xl bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center">
              U
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
