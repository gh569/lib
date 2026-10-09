import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";


/**
 * 高阶组件，为组件添加样式作用域
 * @param {Function} Component - 要包装的组件
 * @returns {Function} - 包装后的组件
 * @example
 * import { withScopedStyles } from './withScopedStyles';
 * const MyComponent = ({ children }) => (
 *   <div>
 *     <style>
 *       .my-component { color: red; }
 *     </style>
 *     {children}
 *   </div>
 * );
 * export default withScopedStyles(MyComponent);
 * 
 */
function withScopedStyles(Component) {
  return function StyledComponent(props) {
    const state = useRef({
      styleContent: "",
      styleElement: null,
      hasStyledJSX: false,
      uniqueClass: generateUniqueId(),
      isTransitioning: false
    });

    // 组件卸载时移除样式元素
    useEffect(() => () => {
      state.current.styleElement?.parentNode?.removeChild(state.current.styleElement);
    }, []);

    const processVNode = (node) => {
      if (!node?.type) return node;

      if (node.type === "style" && node.props?.children) {
        state.current.styleContent = node.props.children;
        return null;
      }
      if (node.type.toString().includes("JSXStyle")) {
        state.current.hasStyledJSX = true;
        return null;
      }

      const newProps = { ...node.props };
      // 给根元素添加唯一类名
      if (!newProps.className) {
        newProps.className = state.current.uniqueClass;
      } else {
        newProps.className += ` ${state.current.uniqueClass}`;
      }
      if (newProps.children) {
        newProps.children = Array.isArray(newProps.children) 
          ? newProps.children.map(processVNode) 
          : processVNode(newProps.children);
      }

      return h(node.type, newProps, newProps.children);
    };

    const vnode = Component(props);
    const processedVNode = processVNode(vnode);

    if (state.current.hasStyledJSX) return h(Component, props);

    if (state.current.styleContent && !state.current.isTransitioning) {
      const processedStyles = processStyles(state.current.styleContent, state.current.uniqueClass);
      injectStyles(processedStyles, state);
      state.current.isTransitioning = true;
    }

    return processedVNode;
  };
}


// 生成唯一标识符
function generateUniqueId  () {
  return  `scoped-${Math.random().toString(36).slice(2, 8)}`;
}

// 处理样式，在选择器前添加带 . 的唯一类名，保留原有格式
function processStyles (content, uniqueClass)  {
  if (typeof document === "undefined") return "";
  let result = "";
  let inSelector = false;
  let currentSelector = "";
  let braceDepth = 0;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];

    if (char === '{') {
      if (braceDepth === 0) {
        // 处理最外层选择器
        const processedSelectors = currentSelector.split(',').map(selector => {
          selector = selector.trimEnd();
          if (selector.startsWith(':')) {
            return `${selector}.${uniqueClass}`;
          }
          return `${selector}.${uniqueClass}`;
        }).join(', ');
        result += processedSelectors + '{';
        currentSelector = "";
        inSelector = false;
      } else {
        result += char;
      }
      braceDepth++;
    } else if (char === '}') {
      braceDepth--;
      if (braceDepth === 0) {
        inSelector = true;
      }
      result += char;
    } else {
      if (braceDepth === 0) {
        if (char.trim() !== '') {
          inSelector = true;
        }
        if (inSelector) {
          currentSelector += char;
        } else {
          result += char;
        }
      } else {
        result += char;
      }
    }
  }
  return result;
};

// 注入样式到文档头部
function injectStyles  (content, state) {
  if (typeof document === "undefined") return;
  const newStyle = document.createElement("style");
  state.current.styleElement = newStyle;
  newStyle.textContent = content;
  document.head.appendChild(newStyle);
  return newStyle;
};

export default withScopedStyles;
