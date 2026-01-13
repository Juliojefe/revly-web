// used when displaying a post
export interface DisplayPostType {
  postId: number,
  authorId: number;
  description: string;
  createdBy: string;
  createdByProfilePicUrl: string;
  createdAt: string; // ISO date string
  likeIds: number[];
  likeCount: number;
  commentIds: number[];
  commentCount: number;
  imageUrls: string[];
  savedIds: number[];
}