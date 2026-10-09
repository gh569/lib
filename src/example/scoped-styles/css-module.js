import { h, cloneElement, toChildArray } from 'preact';

/**
 * 递归处理子元素，应用 CSS 模块
 * @param {any} children - 子元素
 * @param {Object} styles - CSS 模块对象
 * @param {Object} options - 配置项
 * @returns {any} - 处理后的子元素
 */
function processChildren(children, styles, options) {
    return toChildArray(children).map((child) => {
        if (typeof child !== 'object' || child === null) {
            return child;
        }

        const newProps = { ...child.props };

        if (newProps.className) {
            const classNames = options.allowMultiple ? newProps.className.split(' ') : [newProps.className];
            const mappedClassNames = classNames.map((className) => {
                const mapped = styles[className];
                if (!mapped && options.errorWhenNotFound) {
                    throw new Error(`Class name "${className}" not found in CSS module.`);
                }
                return mapped || className;
            });
            newProps.className = mappedClassNames.join(' ');
        }

        if (newProps.children) {
            newProps.children = processChildren(newProps.children, styles, options);
        }

        return cloneElement(child, newProps);
    });
}

/**
 * 模拟 react-css-modules 功能的高阶函数
 * @param {Function} WrappedComponent - 要包装的组件
 * @param {Object} styles - CSS 模块对象
 * @param {Object} [options] - 可选配置项
 * @param {boolean} [options.allowMultiple=true] - 是否允许使用多个类名
 * @param {boolean} [options.errorWhenNotFound=false] - 类名未找到时是否抛出错误
 * @returns {Function} - 包装后的组件
 */
function withCSSModules(WrappedComponent, styles, options = {}) {
    const { allowMultiple = true, errorWhenNotFound = false } = options;

    return function CSSModulesWrapper(props) {
        let renderedComponent;
        // 判断 WrappedComponent 是否为函数组件
        if (typeof WrappedComponent === 'function') {
            // 直接调用函数组件并传入 props
            renderedComponent = WrappedComponent(props);
        } else {
            // 若不是函数组件，使用 h 函数创建 VNode
            renderedComponent = h(WrappedComponent, props);
        }

        let newProps = { ...renderedComponent.props };

        // 处理根元素的 className
        if (newProps.className) {
            const classNames = allowMultiple ? newProps.className.split(' ') : [newProps.className];
            const mappedClassNames = classNames.map((className) => {
                const mapped = styles[className];
                if (!mapped && errorWhenNotFound) {
                    throw new Error(`Class name "${className}" not found in CSS module.`);
                }
                return mapped || className;
            });
            newProps.className = mappedClassNames.join(' ');
        }

        // 处理子元素
        if (newProps.children) {
            newProps.children = processChildren(newProps.children, styles, options);
        }

        // 重新克隆元素并应用新属性
        return cloneElement(renderedComponent, newProps);
    };
}

export default withCSSModules;
