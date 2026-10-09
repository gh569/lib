import { useJdData } from "./jd-data";
import Jd from "./jiedian";


function Page() {
  const { thisData, current, contentIndex, selectedData,init } = useJdData();
  
  return (
    <Jd 
      thisData={thisData} 
      current={current} 
      contentIndex={contentIndex} 
      selectedData={selectedData} 
      init={init}
    />
  );
}

export default Page;