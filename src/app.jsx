import _routes from "~pages";
import { Router, Route } from "preact-router";
import AsyncRoute from "preact-async-route";
import { createHashHistory } from "history";
import "./app.css";

const history = createHashHistory();
const routes = _routes
  .filter((route) => route.path.toLowerCase().endsWith("/page"))
  .map((route) => ({ ...route, path: route.path.replace("/page", "") || "/" }));
  
function App() {
  return (
    <Router history={history}>
      {routes.map((route, index) => {
        const type = route.component.toString().includes("import(");
        if (type === true) {
          return (
            <AsyncRoute
              path={route.path}
              getComponent={() => route.component().then((m) => m.default)}
              loading={() => <div>Loading...</div>}
              key={index}
            />
          );
        } else {
          return <Route path={route.path} component={route.component} />;
        }
      })}
      <Route default component={() => <div>404</div>} />
    </Router>
  );
}

export default App;
