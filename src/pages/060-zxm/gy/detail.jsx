import style from "./detail.module.css";
import FixButton from "@com/fix-button";

// 提取公共过滤条件函数，提高复用性
const filterByGrade = (items, current) => {
  return items.filter((t) =>
    t.grade[0] === current.grade[0] &&
    t.grade[1] === current.grade[1] &&
    t.grade[2]
  );
};

// 提取选中项比较函数，提高代码可读性
const isSameItem = (a, b) => {
  return (
    a.grade[0] === b.grade[0] &&
    a.grade[1] === b.grade[1] &&
    a.grade[2] === b.grade[2]
  );
};

export default function Detail({ thisData, current, selectedData }) {
  const itemClick = (item) => {
    const updatedItem = { ...item, selected: !item.selected };

    // 更新 thisData
    thisData.value = thisData.value.map((i) =>
      isSameItem(i, item) ? updatedItem : i
    );

    // 更新 selectedData
    if (updatedItem.selected) {
      // 检查是否已经存在于 selectedData 中，避免重复添加
      const exists = selectedData.value.some(v => isSameItem(v, updatedItem));
      if (!exists) {
        selectedData.value = [...selectedData.value, updatedItem];
      }
    } else {
      // 正确地根据 grade 信息移除项目
      selectedData.value = selectedData.value.filter(
        (v) => !isSameItem(v, updatedItem)
      );
    }
  };

  // 提前过滤数据以提高渲染性能，并同步选中状态
  const filteredItems = filterByGrade(thisData.value, current.value).map(item => {
    // 检查该项目是否在 selectedData 中被选中
    const selectedItem = selectedData.value.find(selected => isSameItem(selected, item));
    return selectedItem ? {...item, selected: true} : {...item, selected: false};
  });

  return (
    <div>
      <div className={style.text}>
        {filteredItems.map((item) => (
          <div
            key={`${item.grade[0]}-${item.grade[1]}-${item.grade[2]}`}
            className={style.item}
            onClick={() => itemClick(item)}
          >
            <input
              type="checkbox"
              checked={item.selected || false}
              readOnly
            />
            {item.value}
          </div>
        ))}
      </div>
      <FixButton onClick={() => history.back()}>←</FixButton>
    </div>
  );
}
