import Gy from "./gy";
import { useGyData } from "./gy-data";

function Page() {
  const { thisData, current, contentIndex, selectedData, init } = useGyData("gy");

  return (
    <Gy
      thisData={thisData}
      current={current}
      contentIndex={contentIndex}
      selectedData={selectedData}
      init={init}
    />
  );
}

export default Page;
