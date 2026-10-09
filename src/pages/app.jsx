// src/pages/index/app.jsx
import routes from "~pages";
import { Router, Route, Switch } from "wouter-preact";
import { useHashLocation } from "wouter-preact/use-hash-location";
import "./app.css";


/**
 * 主路由组件，渲染所有路由
 */

const App = () => {
  return (
    <Router >
      <Switch>
        {routes.map(({name,path,component}) => {
					console.log(path)
          return <Route key={name} path={path} component={component} />;
        })}
        <Route default component={() => <div role="alert">404 - 页面未找到</div>} />
      </Switch>
    </Router>
  );
};

export default App;
