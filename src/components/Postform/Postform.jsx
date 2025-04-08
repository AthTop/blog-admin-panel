import styles from "./Postform.module.css";

export const Postform = ({ error, onSubmit, title, text, state }) => {
  return (
    <div className={styles.wrapper}>
      <span>{error}</span>
      <form action={onSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={title}
        />
        <label htmlFor="text">Text: </label>
        <textarea name="text" required defaultValue={text}></textarea>
        <div className={styles.checkbox}>
          <label htmlFor="publish">Publish</label>
          <input
            type="checkbox"
            name="publish"
            id="publish"
            value="publish"
            defaultChecked={state && state === "published"}
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};
