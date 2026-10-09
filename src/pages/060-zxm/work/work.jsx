import { useSignal } from '@preact/signals';
import { copyToClipboard } from '@utils/copy-to-clipboard';
import { replacePlaceholders } from '@utils/replace-placeholders';
import { useTagData } from '@utils/use-tag-data';
import ListItem from '@com/list-item';
import style from './work.module.css';

const THIS_TAB = 'pqgz';

export default function Peiqian() {
  const thisData = useTagData(THIS_TAB);
  const contentIndex = useSignal(1);
  const textRef = useSignal(null);

  // 一级菜单项
  const firstLevelItems = thisData.value.filter(item => item.grade[0] && !item.grade[1]);

  // 二级列表内容（合并过滤与映射逻辑）
  const listItems = thisData.value
    .filter(item => item.grade[0] === contentIndex.value && !item.grade[2] && item.grade[1] >= 0)
    .map(item => {
      // 查找对应的子项，使用可选链(?.)简化取值
      const child = thisData.value.find(
        i => i.grade[0] === item.grade[0] && i.grade[1] === item.grade[1] && i.grade[2]
      );
      
      return {
        value: replacePlaceholders(child?.value ?? item.value),
        title: child ? item.value : '',
        key: `${item.grade[0]}-${item.grade[1]}`
      };
    });

  return (
    <div>
      <div className={style.content}>
        {firstLevelItems.map(item => (
          <div
            key={item.grade[0]}
            // 使用数组的 join 方法动态拼接 className，避免冗长的三元表达式
            className={[
              style.contentItem,
              item.grade[0] === contentIndex.value && style.selected
            ].filter(Boolean).join(' ')}
            onClick={() => contentIndex.value = item.grade[0]}
          >
            {item.value}
          </div>
        ))}
      </div>

      <div className={style.text} ref={el => textRef.value = el}>
        <ul>
          {listItems.map(item => (
            <ListItem
              key={item.key}
              title={item.value}
              time={
                <button 
                  onClick={() => copyToClipboard(item.value)} 
                  className={style['copy-btn']}
                >
                  {/* 利用逻辑或 || 简化默认值显示 */}
                  {item.title || '复制'}
                </button>
              }
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
