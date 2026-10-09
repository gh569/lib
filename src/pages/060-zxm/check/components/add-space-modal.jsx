import styles from "../check.module.css";

export default function AddSpaceModal({
  checkData,
  newSpaceName,
  setNewSpaceName,
  selectedOriginalSpaces,
  toggleOriginalSpaceSelection,
  createCustomSpace,
  hideAddSpace,
}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles["modal-title"]}>创建自定义空间</h3>
          <button className={styles.closeButton} onClick={hideAddSpace}>
            ×
          </button>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>空间名称:</label>
          <input
            type="text"
            value={newSpaceName}
            onInput={(e) => setNewSpaceName(e.target.value)}
            placeholder="请输入自定义空间名称"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>选择原始空间:</label>
          <p className={styles.helpText}>可多选，自定义空间将包含所选空间的所有项目</p>
          <div className={styles.originalSpacesGrid}>
            {checkData.header
              .filter((headerItem) => !headerItem.isCustom)
              .map((headerItem) => (
                <label
                  key={headerItem.title}
                  className={`${styles.originalSpaceLabel} ${
                    selectedOriginalSpaces.includes(headerItem.title) ? styles.selected : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedOriginalSpaces.includes(headerItem.title)}
                    onChange={() => toggleOriginalSpaceSelection(headerItem.title)}
                    className={styles.hiddenCheckbox}
                  />
                  <span className={styles.spaceItem}>{headerItem.title}</span>
                </label>
              ))}
          </div>
        </div>

        <div className={styles.modalActions}>
          <button onClick={createCustomSpace} className={styles.primaryButton}>
            确认创建
          </button>
          <button onClick={hideAddSpace} className={styles.secondaryButton}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
