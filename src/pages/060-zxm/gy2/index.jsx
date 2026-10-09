import Gy from "../gy/gy";
import { useGyData } from "../gy/gy-data";

function Page() {
  const { thisData, current, contentIndex, selectedData, init } = useGyData("gy2", { filterEmpty: true });

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
