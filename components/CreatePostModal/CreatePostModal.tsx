import styles from "./CreatePostModal.module.css";

type CreatePostModalProps = {
  onClose: () => void;
};

export default function CreatePostModal({ onClose }: CreatePostModalProps) {

  function doNothing() {
    return;
  }

  function handleSubmit() {
    return;
    //  TODO
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <form className={styles.modalForm} onSubmit={handleSubmit}>
        <h2 className={styles.formHeader}>Create Post</h2>
        <button className={styles.primaryBtn} type="submit">Upload</button>
      </form>
    </div>
  );
}
