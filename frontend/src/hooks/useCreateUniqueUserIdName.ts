import { useEffect, useState } from "react";
import { generateRandomString } from "../utils/text";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorage";

export interface UserType {
    userId: string;
    userName: string;
} 

function useCreateUniqueUserIdName() {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const localUserId = getLocalStorageItem("userId");
    const localUserName = getLocalStorageItem("userName");
    if (localUserId && localUserName) {
      setUserId(localUserId);
      setUserName(localUserName);
      return;
    }
    const userId = generateRandomString(12);
    const userName = generateRandomString(10);
    setUserId(userId || '');
    setUserName(userName || '');
    setLocalStorageItem("userId", userId);
    setLocalStorageItem("userName", userName);
  }, []);

  return { userId, userName };
}

export default useCreateUniqueUserIdName;
