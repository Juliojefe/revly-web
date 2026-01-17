'use client'

import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment, FaRegBookmark, FaBookmark, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useUser } from '@/app/providers/UserProvider';
import { useRouter } from "next/navigation";
import { DisplayPostType } from '@/types/displayPost';
import styles from "./Post.module.css";

interface PostProps {
  postData?: DisplayPostType | null;
}

export default function Post({ postData = null }: PostProps) {
  const router = useRouter();
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const { user } = useUser();
  const hasImage = (postData?.imageUrls?.length ?? 0) > 0;  //  true if one image or more false otherwise

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

  /**
   * Next, I will simplify the sending logic below, as there is currently a lot of duplicate and repeated code.
   * I will also handle the case where `authorId` is null.
   * 
   * Note: `authorId` may be null if a user has deleted their account. In that scenario,
   * the `user_id` associated with the post is set to null via database cascade rules.
   */

  return (
    <div className={styles.postContainer}>
      {/* header section */}
      <div
        className={styles.headerSection}
        onClick={() => handleGoToProfile(postData.authorId)}
      >
        <img
          className={styles.profilePic}
          src={postData.createdByProfilePicUrl}
          alt="profile picture"
        />
        <p className={styles.userName}>{postData.createdBy}</p>
      </div>
      {/* Image Section */}
      {hasImage ? (
        <div className={styles.imageSection}>
          {postData.imageUrls?.[0] && (
            <img
              className={styles.postImage}
              src={postData.imageUrls[currImageIndex]}
              alt="post image"
            />
          )}
          {postData.imageUrls.length > 1 && currImageIndex > 0 && (
            <button className={styles.prevImageButton} onClick={handleShowPrevImage}>
              <FaChevronLeft />
            </button>
          )}
          {postData.imageUrls.length > 1 && currImageIndex < postData.imageUrls.length - 1 && (
            <button className={styles.nextImageButton} onClick={handleShowNextImage}>
              <FaChevronRight />
            </button>
          )}
        </div>
      ) : null}
      {/* description section */}
      <p className={styles.postDescription}>{postData.description || ""}</p>
      {/* like count */}
      <p className={styles.likeCount}>{postData.likeCount || 0} likes</p>
      {/* like comment save icons */}
      <div className={styles.actionIcons}>
        <FaRegHeart
          className={styles.icon}
          onClick={() => handleLike()}
        />
        <FaRegComment
          className={styles.icon}
          onClick={() => handleComments()}
        />
        <FaRegBookmark
          className={styles.icon}
          onClick={() => handleSave()}
        />
      </div>
    </div>

  )
}