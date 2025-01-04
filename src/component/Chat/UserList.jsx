import React from "react";

const UsersList = ({
  users,
  onlineUsers,
  searchInput,
  setSearchInput,
  handleSelectUser,
  selectedUser,
}) => {
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput)
  );

  return (
    <div className="w-58 bg-gray-800 p-4">
      <input
        type="text"
        placeholder="Search users..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
        className="mb-4 p-2 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="space-y-2 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const isActive = onlineUsers.some(
              (onlineUser) => onlineUser.user_id === String(user.id)
            );
            return (
              <li
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className={`p-2 rounded cursor-pointer flex items-center gap-2 hover:bg-gray-700 ${
                  selectedUser?.id === user.id ? "bg-gray-500 text-white" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={
                      user.image
                        ? `/image/${user.image}`
                        : `https://ui-avatars.com/api/?name=${user.name}`
                    }
                    alt={user.name}
                    className="w-8 h-8 rounded-md object-cover"
                  />
                  <div
                    className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 ${
                      isActive ? "bg-red-500" : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <span className="text-white text-sm">{user.name}</span>
              </li>
            );
          })
        ) : (
          <p className="text-gray-400">No users available.</p>
        )}
      </ul>
    </div>
  );
};

export default UsersList;
