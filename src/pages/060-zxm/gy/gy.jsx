import style from "./gy.module.css";
import FixButton from "@com/fix-button";
import Copy from "@com/copy";
import Detail from "./detail";
import dialog from "@utils/dialog";

/**
 * 工艺选择组件（gy / gy2 共用；step4 复用）。
 * @param {object} props
 * @param {import('@preact/signals').Signal} props.thisData 数据信号
 * @param {import('@preact/signals').Signal} props.current 当前选中项
 * @param {import('@preact/signals').Signal} props.contentIndex 一级菜单索引
 * @param {import('@preact/signals').Signal} props.selectedData 已选数据
 * @param {Function} props.init 数据重载函数
 * @param {boolean} [props.showCopy=true] 是否显示底部复制按钮（step4 隐藏）
 */
function Gy({ thisData, current, contentIndex, selectedData, init, showCopy = true }) {
  // 提取重复的条件判断为一个函数
  const isSameGrade = (a, b) => a.grade[0] === b.grade[0] && a.grade[1] === b.grade[1];

  const removeSelectedData = (target) => {
    // 使用 map 创建新数组，避免直接修改原数组
    thisData.value = thisData.value.map((item) => (isSameGrade(item, target) ? { ...item, selected: false } : item));
    // 使用 filter 过滤出不匹配的项
    selectedData.value = selectedData.value.filter((item) => !isSameGrade(item, target));
  };

  const hasChildren = (target) => {
    // 直接返回布尔值，简化代码
    return thisData.value.some((item) => isSameGrade(item, target) && item.grade[2]);
  };

  const itemClick = (target) => {
    const isSelected = !target.selected;

    // 更新 thisData 中的目标项
    thisData.value = thisData.value.map((item) => {
      if (item.grade[0] === target.grade[0] && item.grade[1] === target.grade[1]) {
        return { ...item, selected: isSelected };
      }
      return item;
    });

    if (!isSelected) {
      removeSelectedData(target);
    } else {
      const updatedTarget = { ...target, selected: isSelected };
      // 使用扩展运算符添加新项
      selectedData.value = [...selectedData.value, updatedTarget];
    }

    if (hasChildren(target) && isSelected) {
      const updatedTarget = { ...target, selected: isSelected };
      current.value = updatedTarget;
      dialog.show(<Detail thisData={thisData} current={current} selectedData={selectedData} />);
    }
  };

  const cpyClick = () => {
    dialog.show(<Copy selectedData={selectedData} onAfterCopy={init} />);
  };

  // 提取过滤逻辑到单独的函数
  const getContentItems = () => thisData.value.filter((item) => item.grade[0] && !item.grade[1]);
  const getTextItems = () =>
    thisData.value.filter((item) => item.grade[0] === contentIndex.value && !item.grade[2] && item.grade[1]);

  return (
    <div className={style.main}>
      <div className={style.content}>
        {getContentItems().map((item) => (
          <div
            key={item.grade[0]}
            className={
              item.grade[0] === contentIndex.value ? `${style.contentItem} ${style.selected}` : style.contentItem
            }
            onClick={() => (contentIndex.value = item.grade[0])}>
            {item.value}
          </div>
        ))}
      </div>
      <div className={style.text}>
        {getTextItems().map((item) => (
          <div key={`${item.grade[0]}-${item.grade[1]}`} className={style.textItem} onClick={() => itemClick(item)}>
            <input type="checkbox" checked={item.selected || false} readOnly />
            {item.value}
          </div>
        ))}
      </div>
      {showCopy && <FixButton onClick={cpyClick}>❏</FixButton>}
    </div>
  );
}

export default Gy;
