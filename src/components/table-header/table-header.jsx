import style from './table-header.module.css';

const TableHeader = ({ title, subtitle, actions, showBack = false }) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      {/* 占位元素，与实际头部具有相同的内容和样式 */}
      <div className={style['header-placeholder']}>
        <div className={style['header-inner']}>
          {showBack && <button className={style['back-button']}>← 返回 </button>}
          <div className={style['header-content']}>
            <h1 className={style['header-title']}>{title}</h1>
            {subtitle && <p className={style['header-subtitle']}>{subtitle}</p>}
          </div>
          {actions && <div className={style['header-actions']}>{actions}</div>}
        </div>
      </div>

      {/* 实际的固定头部 */}
      <div className={style['table-header']}>
        <div className={style['header-inner']}>
          {showBack && (
            <button className={style['back-button']} onClick={handleBack}>
              ← 返回
            </button>
          )}
          <div className={style['header-content']}>
            <h1 className={style['header-title']}>{title}</h1>
            {subtitle && <p className={style['header-subtitle']}>{subtitle}</p>}
          </div>
          {actions && <div className={style['header-actions']}>{actions}</div>}
        </div>
      </div>
    </>
  );
};

export default TableHeader;
