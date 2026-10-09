import useCssModule from "../utils/use-css-module";
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
  const css=useCssModule(styles)
  return css(
    <div className="container">
      <div className="text">Hello World</div>
      <Test className="text" />
    </div>
  );
}
export default App

