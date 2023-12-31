import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [UserId, SetUserId] = useState("");
  return (
    <UserType.Provider value={{ UserId, SetUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
