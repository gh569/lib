import register from "preact-custom-element";
import { h } from "preact";

function Test(props) {
  const { name = "world" } = props;
  return h(
    "div",
    {},
    h('h1',{},'使用preact-custom-element创建html元素'),
    h("button", { onClick: () => alert('hello') }, `hello ${name}!`)
  );
}

try{
	register(Test, "x-test", ["name", "onMyevent"]);
}catch(e){
	console.log(e)
	}

export default function App() {
  return h("x-test", { onMyevent: () => console.log("click") });
}
