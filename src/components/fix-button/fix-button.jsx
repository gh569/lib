import style from "./fix-button.module.css";

/**
 * 固定位置圆形按钮组件
 * @param {Object} props
 * @param {string|number} props.value - 按钮文字或数量数字
 * @param {Function} props.onClick - 按钮点击事件
 * @param {JSX.Element} [props.children] - 可选图标，传入时渲染在文字上方（列布局）
 */
function FixButton({ value, onClick, children }) {
  const hasIcon = children != null;
  return (
    <button type="button" onClick={onClick} className={style["fix-button"]}>
      {hasIcon && <span className={style.icon}>{children}</span>}
      {value != null && (
        <span className={hasIcon ? `${style.text} ${style["text-with-icon"]}` : style.text}>
          {value}
        </span>
      )}
    </button>
  );
}

export default FixButton;
