import React from "react";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { useSocketContext } from "../providers/SocketProvider";

const UserList: React.FC = () => {
  const {
    game: { users },
  } = useSocketContext();
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.userId} disablePadding>
          <ListItemButton disabled={!user.isActive}>
            <ListItemText
              primary={user.userName}
              sx={{ color: user.isActive ? "black" : "gray" }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
