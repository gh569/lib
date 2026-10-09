import { useSignal } from "@preact/signals";
import { copyToClipboard } from "@utils/copy-to-clipboard";
import { useTagData } from "@utils/use-tag-data";
import style from "./liucheng.module.css";
import FixButton from "@com/fix-button";

const thisTab = "pqlc";

export default function Peiqian() {
  const thisData = useTagData(thisTab);
  const contentIndex = useSignal(1);
  const textRef = useSignal(null);

  const cpyClick = () => {
    if (textRef.value) {
      copyToClipboard(textRef.value.innerText);
    }
  };

  // 过滤一级菜单项
  const firstLevelItems = thisData.value.filter(item => item.grade[0] && !item.grade[1]);
  
  // 过滤当前选中项的文本内容（grade[1] == 1）
  const textContent = thisData.value.filter(item => 
    item.grade[0] == contentIndex.value && !item.grade[2] && item.grade[1] == 1
  ).map(item => item.value.replace(/\t/g, "  "));
  
  // 过滤当前选中项的列表内容（grade[1] > 1）
  const listItems = thisData.value.filter(item => 
    item.grade[0] == contentIndex.value && !item.grade[2] && item.grade[1] > 1
  );

  return (
    <div className={style.main}>
      <div className={style.content}>
        {firstLevelItems.map(item => (
          <div
            key={item.grade[0]}
            className={
              item.grade[0] == contentIndex.value
                ? `${style.contentItem} ${style.selected}`
                : style.contentItem
            }
            onClick={() => {
              contentIndex.value = item.grade[0];
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
      
      <div className={style.text} ref={(element) => (textRef.value = element)}>
        <pre>
          {textContent.join('\n')}
        </pre>
        <ul>
          {listItems.map((item, index) => (
            <li key={item.index}>
              {index + 1}. {item.value.replace(/\t/g, "  ")}
            </li>
          ))}
        </ul>
      </div>
      
      <FixButton onClick={cpyClick}>❏</FixButton>
    </div>
  );
}