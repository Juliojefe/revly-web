import { ReactNode, useEffect, useState } from "react";
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
  const [postDataResponse, setPostDataResponse] = useState<DisplayPostType[]>([]);
  const [postDataRequest, setPostDataRequest] = useState<CreatePostType[]>([]);

  function doNothing() {
    return;
  }

  function handleSubmit() {
    return;
    //  TODO
  }

  return (
    <div
      className={styles.backdrop}
      onClick={user === undefined ? undefined : onClose}  // prevent closing modal while it is still loading
    >
      {user === undefined ? (
        <div className={styles.modalForm}>
          <h3 className={styles.loadingUser}>Getting things ready<span className={styles.dots}></span></h3>
        </div>
      ) : user ? (
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <h2 className={styles.formHeader}>Create Post</h2>
          <button className={styles.primaryBtn} type="submit">Upload</button>
        </form>
      ) : (
        <div className={styles.modalForm}>
          <h2 className={styles.formHeader}>You Must Be Signed In To Upload Posts</h2>
          <h3 className={styles.formSubHeader}>Already have an account?</h3>
          <button className={styles.primaryBtn} type="button" onClick={async () => router.push("/login")}> Login </button>
          <h3 className={styles.formSubHeader}>New?</h3>
          <button className={styles.secondaryBtn} type="button" onClick={async () => router.push("/signUp")}> Create Account </button>
        </div>
      )}
    </div>
  );
}
