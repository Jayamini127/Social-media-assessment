export interface NotificationItem {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  details?: string; // e.g., the comment text or post reference text
  timestamp: string;
  isRead: boolean;
}

export const mockNotifications: NotificationItem[] = [
  {
    id: "notif_1",
    type: "like",
    user: {
      name: "Chloe Chen",
      username: "design_bunny",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    details: "liked your post \"Working on a minimal interface kit...\"",
    timestamp: "2m ago",
    isRead: false,
  },
  {
    id: "notif_2",
    type: "comment",
    user: {
      name: "Marcus Vance",
      username: "marcus_dev",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    details: "commented: \"This layout implementation is incredibly clean! 🔥\"",
    timestamp: "15m ago",
    isRead: false,
  },
  {
    id: "notif_3",
    type: "follow",
    user: {
      name: "Sarah Jenkins",
      username: "sarah_j",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    details: "started following you",
    timestamp: "2h ago",
    isRead: true,
  },
  {
    id: "notif_4",
    type: "mention",
    user: {
      name: "Chloe Chen",
      username: "design_bunny",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    details: "mentioned you in a caption: \"Check out @alex_dev dashboard setup!\"",
    timestamp: "1d ago",
    isRead: true,
  }
];