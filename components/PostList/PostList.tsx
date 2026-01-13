'use client'

import React, { useState } from "react";
import { DisplayPostType } from '@/types/displayPost';
import Post from '@/components/Post/Post';

interface PostListProps {
  postDataArray?: DisplayPostType[];
}

export default function PostList({ postDataArray = [] }: PostListProps) {
  return (
    postDataArray.map((post) => (
      <Post key={post.postId} postData={post} />
    ))
  );
}
