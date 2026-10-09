import { route } from "my";
import store from "utils/store.js";
import FixButton from "com/fix-button.jsx";

const TAB_NAME = "tab-ts";

export default function Ts() {
  const { thisData, contentIndex } = store.getDataByName(TAB_NAME);

  // 处理单项点击事件
  const handleItemClick = (item) => {
    item.selected = !item.selected;
    thisData.value = [...thisData.value];
  };

  // 处理复制按钮点击
  const handleCopyClick = () => {
    route(`/copy?tab=${TAB_NAME}`);
  };

  // 渲染内容列表项
  const renderContentItem = (item) => {
    const isSelected = item.grade[0] === contentIndex.value;
    const className = isSelected ? 'selected' : '';

    return (
      <div
        key={item.grade[0]}
        className={`content-item ${className}`}
        onClick={() => {
          contentIndex.value = item.grade[0];
        }}
      >
        {item.value}
      </div>
    );
  };

  // 渲染文本列表项
  const renderTextItem = (item) => {
    const isTitle = item.value.substring(0, 3) === "---";
    
    if (isTitle) {
      return (
        <div key={item.grade[1]} className="text-title">
          {item.value}
        </div>
      );
    }

    return (
      <div 
        key={item.grade[1]} 
        className="text-item" 
        onClick={() => handleItemClick(item)}
      >
        <input 
          type="checkbox" 
          checked={!!item.selected} 
          readOnly
        />
        {item.value}
      </div>
    );
  };

  // 过滤内容列表：显示已选中但未完成的项
  const contentItems = thisData.value.filter(
    (item) => item.grade[0] && !item.grade[1]
  );

  // 过滤文本列表：显示当前选中内容的子项
  const textItems = thisData.value.filter(
    (item) => 
      item.grade[0] === contentIndex.value && 
      !item.grade[2] && 
      item.grade[1]
  );

  return (
    <div className="container">
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        
        .content {
          position: absolute;
          left: 0;
          top: 0;
          width: var(--content-width);
          height: 100%;
          border-right: 1px solid #e0e0e0;
          overflow-y: auto;
          background-color: #ffffff;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .content::-webkit-scrollbar {
          width: 6px;
        }
        
        .content::-webkit-scrollbar-thumb {
          background-color: #c1c1c1;
          border-radius: 3px;
        }
        
        .content::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }
        
        .content-item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50px;
          text-align: center;
          white-space: nowrap;
          border-bottom: 1px solid #f0f0f0;
          font-size: var(--font-size);
          color: #333;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        
        .content-item:hover {
          background-color: #f8f9fa;
          color: #1890ff;
        }
        
        .content-item.selected {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          font-weight: 600;
          box-shadow: inset 3px 0 0 #4a5eeb;
        }
        
        .text {
          position: absolute;
          left: calc(var(--content-width) + 5px);
          top: 0;
          text-align: center;
          width: calc(100% - var(--content-width) - 5px);
          height: 100%;
          overflow-y: auto;
          font-size: var(--font-size);
          background-color: #fafafa;
          padding: 10px 0;
        }
        
        .text::-webkit-scrollbar {
          width: 6px;
        }
        
        .text::-webkit-scrollbar-thumb {
          background-color: #c1c1c1;
          border-radius: 3px;
        }
        
        .text::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }
        
        .text-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          min-height: 80px;
          border-bottom: 1px solid #f0f0f0;
          font-size: var(--font-size);
          text-align: left;
          padding: 15px 20px;
          box-sizing: border-box;
          background-color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 5px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        .text-item:hover {
          background-color: #f0f7ff;
          box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
          transform: translateY(-2px);
        }
        
        .text-item input[type="checkbox"] {
          margin-right: 12px;
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #1890ff;
        }
        
        .text-title {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 36px;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-bottom: 2px solid #5a6fd6;
          font-size: var(--font-size);
          font-weight: 600;
          color: #ffffff;
          margin: 10px 0 15px 0;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
          letter-spacing: 1px;
        }
      `}</style>
      
      <div className="content">
        {contentItems.map(renderContentItem)}
      </div>

      <div className="text">
        {textItems.map(renderTextItem)}
      </div>

      <FixButton value="复制" onClick={handleCopyClick} />
    </div>
  );
}