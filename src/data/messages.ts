export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
    isOnline: boolean;
  };
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

export const mockConversations: Conversation[] = [
  {
    id: "chat_1",
    user: {
      id: "user_2",
      name: "Emma Wilson",
      username: "emma_w",
      avatarUrl: "/avatar2.jpg",
      isOnline: true,
    },
    lastMessage: "The new UI components look super sleek! 🔥",
    unreadCount: 2,
    messages: [
      { id: "m1", senderId: "user_2", text: "Hey Alex! Did you manage to look over those minimal dashboard interface assets?", timestamp: "10:15 AM" },
      { id: "m2", senderId: "1", text: "Hey Chloe! Yes, I just checked them out. They fit perfectly into the dark mode styling.", timestamp: "10:18 AM" },
      { id: "m3", senderId: "user_2", text: "Awesome! The new UI components look super sleek! 🔥", timestamp: "10:20 AM" },
    ],
  },
  {
    id: "chat_2",
    user: {
      id: "user_3",
      name: "Marcus Vance",
      username: "marcus_dev",
      avatarUrl: "avatar3.webp",
      isOnline: false,
    },
    lastMessage: "Let me check the repository branch tonight.",
    unreadCount: 0,
    messages: [
      { id: "m4", senderId: "user_3", text: "Are we still on for syncing up database models later?", timestamp: "Yesterday" },
      { id: "m5", senderId: "1", text: "Yep! I'll have the order structures pushed before 6 PM.", timestamp: "Yesterday" },
      { id: "m6", senderId: "user_3", text: "Sounds perfect. Let me check the repository branch tonight.", timestamp: "Yesterday" },
    ],
  },
];