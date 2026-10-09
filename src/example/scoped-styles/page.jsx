import withScopedStyles from "utils/css-module/withScopedStyles";
import { signal } from "@preact/signals";
const count = signal(0);
function css(strings, ...values) {
  return strings.map((string, i) => string + (values[i] || "")).join("");
}

function Page() {
  return (
    <div>
      <h1 className="h1">styled-jsx应用</h1>
      <p className="p1 p2">我理解你的需求，现在优化随机数生成部分，使用更可靠的唯一ID生成方式。以下是优化后的代码：</p>
      <div className="div">
        <p className="count">{count.value}</p>
        <button className="button" onClick={() => count.value++}>
          +1
        </button>
      </div>
      <style >
        {`
          .h1 {
            color: blue;
            text-align: center;
          }

          .p1 {
            color: red;
            font-size: 16px;
            text-align: center;
          }
          .p2 {
            font-size: 18px;
          }
          .div {
            background-color: #f0f0f0;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .count {
            font-size: 24px;
            font-weight: bold;
            color: #333;
          }
          .button {
            background-color: #0056b3;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
          }
          .button:hover {
            background-color: #007bff;
          }
        `}
      </style>
    </div>
  );
}

export default withScopedStyles(Page);
