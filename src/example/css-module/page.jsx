import { route } from "preact-router";
import styles from './button.module.css'
import withCssModule from './utils/with-css-module'

function App() {
  return (
    <div className='pageContainer'>
      <h1 className='title'>CSS Module 示例导航</h1>
      <div className='item'>
        <button className="menuButton" onClick={() => route("/css-module/use-css-module/")}>
          使用自定义函数useCssModule示例
        </button>
      </div>
      <div className='item'>
        <button className="menuButton" onClick={() => route("/css-module/with-css-module/")}>
          使用自定义函数withCssModule示例
        </button>
      </div>
      <div className='item'>
        <button className="menuButton" onClick={() => route("/css-module/css-module/")}>
          使用自定义函数cssModule定义Css
        </button>
      </div>
      <div className='item'>
        <button className="menuButton" onClick={() => route("/css-module/react-css-module/")}>
          使用自定义函数react-css-module示例
        </button>
      </div>
    </div>
  );
}

export default withCssModule(App, styles);