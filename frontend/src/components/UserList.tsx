import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSocketContext } from "../providers/SocketProvider";
import { useUser } from "../providers/User";

const UserList = () => {
  const {
    game: { users },
  } = useSocketContext();
  const { user: currentUser } = useUser();
  console.log(users);
  return (
    <Box
      sx={{
        width: 300,
        borderRadius: 2,
        border: "2px solid black",
        overflow: "hidden",
      }}
    >
      {users.map((user, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "none",
            borderBottom:
              index !== users.length - 1 ? "2px solid black" : "none",
            borderRadius: 0,
          }}
        >
          <CardContent sx={{ flexGrow: 2, padding: "10px" }}>
            <Typography fontWeight="bold">
              {user.userName}{" "}
              {user.userId === currentUser.userId && (
                <>
                  (
                  <Typography component="span" sx={{ fontSize: 12 }}>
                    You
                  </Typography>
                  )
                </>
              )}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.userId}
            </Typography>
          </CardContent>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Card>
      ))}
    </Box>
  );
};

export default UserList;
