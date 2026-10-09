import styles from "../check.module.css";

export default function TabNav({ checkedHeaders, activeTab, switchTab, showHeader, toggleHeaderVisibility }) {
  return (
    <div className={styles.tabContainer}>
      {checkedHeaders.length > 0 && checkedHeaders.map((headerItem) => (
        <button
          key={headerItem.title}
          onClick={() => switchTab(headerItem.title)}
          className={`${styles.tabButton} ${(activeTab === headerItem.title && !showHeader) ? styles.activeTab : ""}`}
        >
          {headerItem.title}
        </button>
      ))}
      <button onClick={toggleHeaderVisibility} className={`${styles.tabButton} ${styles.headerToggle} ${showHeader?styles.activeTab:""}`}>
        <span>选择空间</span>
      </button>
    </div>
  );
}
