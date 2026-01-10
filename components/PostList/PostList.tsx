'use client'

import React, { useState } from "react";
import { PostType } from '@/types/post';
import Post from '@/components/Post/Post';

interface PostListProps {
  postDataArray?: PostType[];
}

export default function PostList({ postDataArray = [] }: PostListProps) {
  return (
    postDataArray.map((post) => (
      <Post key={post.postId} postData={post} />
    ))
  );
}
