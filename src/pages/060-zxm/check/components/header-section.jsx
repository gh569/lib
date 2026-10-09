import styles from "../check.module.css";

export default function HeaderSection({ checkData, toggleHeader, showAddSpace, generalSummary, setGeneralSummary }) {
  return (
    <div className={styles.headerSection}>
      <div className={styles.headerSectionHeader}>
        <h3 className={styles.sectionTitle}>选择空间</h3>
        <button onClick={showAddSpace} className={styles.addButton}>
          + 增加空间
        </button>
      </div>
      <div className={styles.headerGrid}>
        {checkData.header.map((headerItem, index) => (
          <label
            key={headerItem.title}
            className={`${styles.checkboxLabel} ${headerItem.isCustom ? styles.customSpace : ""}`}
          >
            <input
              type="checkbox"
              checked={headerItem.checked}
              onChange={() => toggleHeader(index, headerItem.title)}
              className={styles.checkboxInput}
            />
            <span className={styles.spaceName}>{headerItem.title}</span>
            {headerItem.isCustom && <span className={styles.customTag}>自定义</span>}
          </label>
        ))}
      </div>

      <div className={styles.generalSummaryContainer}>
        <h3 className={styles.sectionTitle}>总体总结</h3>
        <textarea
          value={generalSummary}
          onInput={(e) => setGeneralSummary(e.target.value)}
          placeholder="请输入总体总结..."
          className={styles.generalSummaryInput}
        />
      </div>
    </div>
  );
}
