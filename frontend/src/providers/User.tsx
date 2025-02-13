import React, { createContext, useContext } from "react";
import useCreateUniqueUserIdName, { UserType } from "../hooks/useCreateUniqueUserIdName";

interface UserContextType {
  user: UserType;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useCreateUniqueUserIdName();
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

export { UserProvider, useUser };
