import _routes from "~pages";
import { Router, Route } from "preact-router";
import { createHashHistory ,createBrowserHistory} from "history";
import { lazy, Suspense } from "preact/compat";
import "./app.css";

// 创建 hash 历史记录实例
const history = createBrowserHistory();

/**
 * 检查组件是否为懒加载组件
 * @param {Function} component - 待检查的组件
 * @returns {boolean} 是否为懒加载组件
 */
const isLazy = (component) => {
  try {
    return component.toString().includes("import(");
  } catch {
    return false;
  }
};

/**
 * 主路由组件，渲染所有路由
 */
const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Router history={history}>
      {/* 直接处理路由配置并渲染 */}
      {_routes.map((route) => {
        const path = route.path.replace("/page", "") || "/";
        const component = isLazy(route.component) ? lazy(route.component) : route.component;
        return <Route key={path} path={path} component={component} />;
      })}
      <Route default component={() => <div role="alert">404 - 页面未找到</div>} />
    </Router>
  </Suspense>
);

export default App;
