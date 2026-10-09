import { useSignal, useEffect } from "my";
import { INDICES} from "./constants.js";
import style from "./bawei.module.css";
import { readXlsx ,preloadXLSX} from "./read-xlsx.js";
import { getAllData, updateData } from "./get-data.js";
import comps from "./comps";

export default function Bawei() {
  // 使用 useSignal 替代 signal
  const allData = useSignal({});
  const titles = useSignal([]);
  const names = useSignal([]);
  const values = useSignal([]);
  const newValue = useSignal([]);
  const oldValue = useSignal([]);
  const curIndex = useSignal(0);

  useEffect(()=>{
     // 预加载 xlsx_url 模块
    preloadXLSX()
  },[])
  const onFileChange = async (e) => {
    
    try {
      const file = e.target.files[0];
      if (!file) return;
      const d = await readXlsx(file);
      allData.value = getAllData(d);
      // 使用对象解构赋值直接更新信号值
      ({ values: values.value = [], names: names.value = [], titles: titles.value = [] } = allData.value);
      updateData(values, curIndex, newValue, oldValue);
    } catch (err) {
      console.error("读取文件出错:", err);
    }
  };

  const onSelectChange = (e) => {
    curIndex.value = parseInt(e.target.value, 10);
    updateData(values, curIndex, newValue, oldValue);
  };

  return (
    <div className={style.baweiFull}>
      <div className={style.baweiCenter}>
        <div className={style.left}>
          {titles.value.map((v, i) => (
            <div key={i} className={i % 2 === 0 ? style.leftItem : style.leftItemColor}>
              <div className={style.txtIndex}>{i + 1}</div>
              <div className={style.txtContent}>{v}</div>
              <div className={style.txtValue}>{oldValue.value[i]}</div>
              <div className={oldValue.value[i] === newValue.value[i] ? style.txtValue : style.txtValueColor}>
                {newValue.value[i]}
              </div>
            </div>
          ))}
        </div>
        <div className={style.right}>
          <input className={style.rightFile} type="file" onChange={onFileChange} />
          <div>
            <br />
            <select size="12" className={style.selectName} onChange={onSelectChange}>
              {names.value.map((t, i) => (
                <option key={i} value={i} selected={i === curIndex.value}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          {comps(newValue)}
        </div>
      </div>
    </div>
  );
}
