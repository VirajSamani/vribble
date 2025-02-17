import { useEffect, useState } from "react";
import { generateRandomString } from "../utils/text";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";

export interface UserType {
  userId: string;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

function useCreateUniqueUserIdName() {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const localUserId = getLocalStorageItem("userId");
    if (localUserId) {
      setUserId(localUserId);
    } else {
      const userId = generateRandomString(12);
      setUserId(userId || "");
      setLocalStorageItem("userId", userId);
    }
    const localUserName = getLocalStorageItem("userName");
    if (localUserName) {
      setUserName(localUserName);
    } else {
      const userName = generateRandomString(10);
      setUserName(userName || "");
      setLocalStorageItem("userName", userName);
    }
  }, []);

  return { userId, userName, setUserName };
}

export default useCreateUniqueUserIdName;
