import styles from "./Post.module.css";

const Post = () => {
  return (
    <section className={styles.post}>
      <div className={styles.title}>
        POST YOUR BEST RECIPES<span>!</span>
      </div>
      <div className={styles.formcontainer}>123</div>
      <div className={styles.previewcontainer}>123 </div>
    </section>
  );
};

export default Post;
