'use client'

import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useUser } from '../context/UserContext';
import { useRouter } from "next/navigation";
import { PostType } from '@/types/post';

interface PostProps {
  postData?: PostType | null;
}

export default function Post({ postData = null }: PostProps) {
  const router = useRouter();
  const [currImageIndex, setCurrImageIndex] = useState(0);

  if (!postData) {
    return null;
  }

  async function handleGoToProfile(authorId: number) {
    //  TODO
    return;
  }

  function handleShowNextImage() {
    //  TODO
    return;
  } 

  function handleShowPrevImage() {
    //  TODO
    return;
  }

  function handleLike() {
    //  TODO
    return;
  }

  function handleComments() {
    //  TODO
    return;
  }

  function handleSave() {
    //  TODO
    return;
  }

  return (
    <div>
      {/* header section */}
      <div onClick={() => handleGoToProfile(postData.authorId)}>
        <p>{postData.createdBy}</p>
        <img src={postData.createdByProfilePicUrl} alt="profile picture" />
      </div>
      {/* image section */}
      <div>
        {postData.imageUrls?.[0] && (
          <img src={postData.imageUrls[0]} alt="post image" />
        )}
        {(postData.imageUrls.length > 1) && (currImageIndex != postData.imageUrls.length -1) && (
          <button onClick={() => handleShowNextImage()} />
        )}
        {(postData.imageUrls.length > 1) && (currImageIndex > 0) && (
          <button onClick={() => handleShowPrevImage} />
        )}
      </div>
      {/* like count  */}
      <p>{postData.likeCount || 0} likes</p>
      {/* like comment save icons */}
      <div>
        <FaRegHeart onClick={() => handleLike()}/>
        <FaRegComment onClick={() => handleComments()}/>
        <FaRegBookmark onClick={() => handleSave()}/>
      </div>
      {/* description section */}
      <p>{postData.description || ""}</p>
    </div>
  );
}