import React, { ReactNode, useEffect, useState } from "react";
import styles from "./CreatePostModal.module.css";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useUser } from "../../app/providers/UserProvider";
import { CreatePostType } from "@/types/createPost";
import { DisplayPostType } from "@/types/displayPost";


type CreatePostModalProps = {
  onClose: () => void;
};

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const { user } = useUser();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [postDataResponse, setPostDataResponse] = useState<DisplayPostType[]>([]);

  function doNothing() {
    return;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    const payload: CreatePostType = {
      description,
      images,
      createdAt: new Date(),
    };
    console.log(payload);
  }

  return (
    <div
      className={styles.backdrop}
      onClick={user === undefined ? undefined : onClose}  // prevent closing modal while it is still loading
    >
      {user === undefined ? ( //  loading user info case
        <div className={styles.modalForm}>
          <h3 className={styles.loadingUser}>Getting things ready<span className={styles.dots}></span></h3>
        </div>
      ) : user ? (  //  authenticated user present case
        <form className={styles.modalForm} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.formHeader}>Create Post</h2>
          {/* Description */}
          <textarea
            name="description"
            placeholder="Write a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {/* Images */}
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files ?? []))}
            required
          />
          <button className={styles.primaryBtn} type="submit">Upload</button>
        </form>
      ) : ( //  guest user case
        <div className={styles.modalForm} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.formHeader}>You Must Be Signed In To Upload Posts</h2>
          <h3 className={styles.formSubHeader}>Already have an account?</h3>
          <button className={styles.primaryBtn} type="button" onClick={async () => router.push("/login")}> Login </button>
          <h3 className={styles.formSubHeader}>New?</h3>
          <button className={styles.secondaryBtn} type="button" onClick={async () => router.push("/signUp")}> Create Account </button>
        </div>
      )}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
}
