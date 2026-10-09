import { useEffect } from "preact/hooks";
import Dialog from "./dialog";

function Child1() {
  useEffect(() => {
    console.log("child1 start");
    return () => {
      console.log("child1 end");
    };
  }, []);
  return <div>child1</div>;
}

function Home() {
  useEffect(() => {
    console.log("home start");
    return () => {
      console.log("home end");
    };
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          Dialog.show(Child1);
        }}>
        click
      </button>
    </div>
  );
}

export default Home;
