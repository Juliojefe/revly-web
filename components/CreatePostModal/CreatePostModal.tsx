import React, { ReactNode, useEffect, useState } from "react";
import styles from "./CreatePostModal.module.css";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useUser } from "../../app/providers/UserProvider";
import { CreatePostType } from "@/types/createPost";

type CreatePostModalProps = {
  onClose: () => void;
};

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const { user } = useUser();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [successfulUpload, setSuccessfulUpload] = useState(false);

  useEffect(() => {
    if (successfulUpload) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successfulUpload, onClose]);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("description", description);
      formData.append("createdAt", new Date().toISOString());
      for (let i = 0; i < images.length; i++) {
        formData.append("requestImages", images[i]);
      }
      const rawResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/post/create/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      const cookedData = rawResponse.data;
      setSuccessfulUpload(cookedData.success);
      if (!cookedData.success) {
        setErrorMessage(cookedData.message ?? "Upload failed");
      } else {
        setSuccessMessage(cookedData.message);
        /**
         * by setting successfulUpload to true the successmessage will pop up
         * I want to lose the modal that is currently open (onClose) here and let the other open
         * how do I?
         */
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message || "Upload failed");
      } else {
        setErrorMessage("Network error");
      }
    } finally {
      setUploading(false);
    }
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
      ) : user ? (
        successfulUpload ? (
          <div className={styles.modalForm}>
            <h2 className={styles.successMessage}>{successMessage}</h2>
          </div>
        ) : (
          <form className={styles.modalForm} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.formHeader}>Create Post</h2>

            <textarea
              name="description"
              placeholder="Write a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={uploading}
            />

            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files ?? []))}
              disabled={uploading}
            />

            <button
              className={styles.primaryBtn}
              type="submit"
              disabled={uploading}
            >Upload</button>

            {uploading && (
              <div className={styles.uploadingOverlay}>
                <h3 className={styles.loadingUser}>
                  Uploading<span className={styles.dots}></span>
                </h3>
              </div>
            )}

            {errorMessage && (
              <p className={styles.error}>{errorMessage}</p>
            )}
          </form>
        )
      ) : ( // guest user case
        <div className={styles.modalForm} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.formHeader}>You Must Be Signed In To Upload Posts</h2>
          <h3 className={styles.formSubHeader}>Already have an account?</h3>
          <button className={styles.primaryBtn} type="button" onClick={async () => router.push("/login")}> Login </button>
          <h3 className={styles.formSubHeader}>New?</h3>
          <button className={styles.secondaryBtn} type="button" onClick={async () => router.push("/signUp")}> Create Account </button>
        </div>
      )}
    </div >
  );
}
