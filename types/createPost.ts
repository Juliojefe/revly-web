// used when creating a post
export interface CreatePostType {
  description: string;
  createdAt: Date;
  images: File[];
}