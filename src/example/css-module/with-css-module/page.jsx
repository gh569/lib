import withCssModule from "../utils/with-css-module";
import styles from '../button.module.css'

function Test() {
  return (
    <div>
      <div className="text">Hello World!!!!!</div>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <div className="text">Hello World</div>
      <Test className="text" />
    </div>
  );
}

export default withCssModule(App, styles);
