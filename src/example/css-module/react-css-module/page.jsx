import cssModule from "react-css-modules";
import styles from '../button.module.css'
function Test() {
  return (
    <div>
      <h1>Test</h1>
      <div className="text">Hello World!!!!!</div>
    </div>
  );
}

function App() {
  return (
    <div styleName="container">
      <div styleName="text">react-css-module要用styleName,不能用className</div>
      <Test />
    </div>
  );
}
export default cssModule(App,styles)

