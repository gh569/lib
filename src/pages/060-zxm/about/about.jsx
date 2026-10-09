import { useSignal } from "@preact/signals";
import style from "./about.module.css";
import store from "@utils/store.js";
import { useEffect } from "preact/hooks";

// 定义字段列表，方便后续扩展和维护
const fields = ['myname', 'mymail', 'mytel', 'mycity'];

export default function About() {
  const appVersion = useSignal(store.version);
  const dataVersion = useSignal(store.mydata?.version);
  
  useEffect(() => {
    if (!store?.mydata?.version) {
      try {
        const mydata = JSON.parse(localStorage.getItem('mydata') || '{}');
        dataVersion.value = mydata?.version;
      } catch (error) {
        console.error('解析mydata失败:', error);
      }
    }
  }, []);

  // 初始化数据信号 - 更直观的方式
  const data = useSignal({
    myname: store.myname || '',
    mymail: store.mymail || '',
    mytel: store.mytel || '',
    mycity: store.mycity || ''
  });

  // 保存数据的函数
  const saveData = () => {
    fields.forEach(field => {
      store[field] = data.value[field];
      try {
        localStorage.setItem(field, data.value[field]);
      } catch (error) {
        console.error(`保存${field}失败:`, error);
      }
    });
  };

  const confirm = () => {
    saveData();
    // 跳转回上一页
    history.back();
  };

  // 输入框组件，减少重复代码
  const InputField = ({ label, field }) => (
    <div className={style.item}>
      {label}：
      <input
        className={style.input}
        type="text"
        value={data.value[field] || ''}
        onInput={(e) => {
          data.value = {
            ...data.value,
            [field]: e.target.value
          };
        }}
      />
    </div>
  );

  return (
    <div>
      {/* 使用 InputField 组件生成输入框 */}
      <InputField label="姓名" field="myname" />
      <InputField label="电话" field="mytel" />
      <InputField label="邮箱" field="mymail" />
      <InputField label="城市" field="mycity" />
      <div className={style.item}>
        <button className={style.button} onClick={() => history.back()}>
          取消
        </button>
        <button className={style.button} onClick={confirm}>
          确认
        </button>
      </div>
      <div className={style.text}>
        应用版本: {appVersion.value}
        <br />
        数据版本: {dataVersion.value}
      </div>
    </div>
  );
}