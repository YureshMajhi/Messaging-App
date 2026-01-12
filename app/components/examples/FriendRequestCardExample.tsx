import FriendRequestCard, { type FriendRequest } from "../FriendRequestCard";
import { ThemeProvider } from "@/context/ThemeContext";

// todo: remove mock functionality
const mockRequest: FriendRequest = {
  id: "fr1",
  user: {
    id: "u5",
    name: "Alex Rivera",
    username: "alexr",
    avatar: null,
    mutualFriends: 3,
  },
};

export default function FriendRequestCardExample() {
  return (
    <ThemeProvider>
      <div className="max-w-sm mx-auto p-4">
        {/* <FriendRequestCard
          request={mockRequest}
          onAccept={(id) => console.log('Accepted:', id)}
          onReject={(id) => console.log('Rejected:', id)}
        /> */}
      </div>
    </ThemeProvider>
  );
}
