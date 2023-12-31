import { createContext, useEffect, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [UserId, SetUserId] = useState("");
  const [urltohost, seturltohost] = useState("");

  return (
    <UserType.Provider value={{ UserId, SetUserId, urltohost, seturltohost }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
