import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  // Retrieve user details from the Redux store
  const user = useSelector((state) => state.auth);
console.log(user);
  return (
  <>
  ok</>
  );
};

export default Sidebar;
