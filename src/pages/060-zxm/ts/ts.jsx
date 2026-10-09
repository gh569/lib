import FixButton from "@com/fix-button";
import style from "./ts.module.css";
import dialog from '@utils/dialog';
import Copy from "@com/copy";

export default function Ts({ thisData, contentIndex, selectedData, init }) {
  
  // 处理单项点击（选中/取消选中）
  const itemClick = (item) => {
    const isSelected = !item.selected;
    
    // 1. 更新主数据源 thisData
    thisData.value = thisData.value.map(dataItem => 
      dataItem.index === item.index ? { ...dataItem, selected: isSelected } : dataItem
    );

    // 2. 更新选中数据 selectedData
    if (isSelected) {
      // 选中：添加（去重保险）
      selectedData.value = [
        ...selectedData.value.filter(i => i.index !== item.index), // 先移除旧的（如果有）
        { ...item, selected: true }
      ];
    } else {
      // 取消选中：移除
      selectedData.value = selectedData.value.filter(i => i.index !== item.index);
    }
  };

  // 处理复制按钮点击
  const cpyClick = () => {
    if (selectedData.value.length === 0) {
      alert("请先选择要复制的内容"); // 可选：增加提示
      return;
    }
    dialog.show(
      <Copy
        selectedData={selectedData}
        onAfterCopy={init}
      />
    );
  };

  // 过滤一级菜单项
  const firstLevelItems = thisData.value.filter(item => item.grade[0] && !item.grade[1]);
  
  // 过滤当前选中的二级项
  const secondLevelItems = thisData.value.filter(item => 
    item.grade[0] === contentIndex.value && item.grade[1] && !item.grade[2]
  );

  return (
    <div>
      {/* 一级菜单 */}
      <div className={style.content}>
        {firstLevelItems.map(item => (
          <div
            key={item.grade[0]}
            className={`${style.contentItem} ${item.grade[0] === contentIndex.value ? style.selected : ''}`}
            onClick={() => {
              contentIndex.value = item.grade[0];
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
      
      {/* 二级列表 */}
      <div className={style.text}>
        {secondLevelItems.map(item => {
          // 使用 startsWith 更语义化
          if (item.value.startsWith("---")) {
            return (
              <div key={item.index} className={style.textTitle}>
                {item.value}
              </div>
            );
          }
          
          return (
            <div 
              key={item.index} 
              className={style.textItem} 
              onClick={() => itemClick(item)}
            >
              <input
                type="checkbox"
                checked={!!item.selected}
                readOnly
                // 添加 pointer-events: none 防止 input 拦截点击事件导致 div onClick 不触发（视浏览器行为而定，通常 div 冒泡没问题，但加上更稳妥）
                style={{ pointerEvents: 'none' }} 
              />
              {item.value}
            </div>
          );
        })}
      </div>
      
      <FixButton onClick={cpyClick}>❏</FixButton>
    </div>
  );
}