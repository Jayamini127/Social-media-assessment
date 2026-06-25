export interface UserProfile {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  likesCount: number;
}

export interface Post {
  id: string;
  username: string;
  avatarUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  isSaved: boolean;
}