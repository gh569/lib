import styles from "../check.module.css";

export default function FloatingButton({ count, copy }) {
  return (
    <button onClick={copy} className={styles.floatingButton} title={`复制 ${count} 个选中项`}>
      📋
      <br />
      <span style={{ fontSize: "12px" }}>{count}</span>
    </button>
  );
}
