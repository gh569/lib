 import { route } from 'my'
 import store from 'utils/store.js'
 import FixButton from 'com/fix-button';
 import style from './page.module.css';
 

const thisTab = 'tab-jd';

export default function Page() {
const {thisData,contentIndex}=store.getDataByName(thisTab);

const itemClick = (t) => {
  const temp=t.selected
  thisData.value.filter((v)=>{
    if(v.grade[0]==t.grade[0] && v.grade[1]==t.grade[1] && v.grade[2]){
      v.selected=false;
    } 
  })
  t.selected =!temp;
  thisData.value = [...thisData.value];
};

const cpyClick = () => {
  thisData.value.filter((t) =>  t.selected).forEach((t) => {
    let index=thisData.value.findIndex((v)=>v.grade[0]==t.grade[0] && v.grade[1]==t.grade[1] && !v.grade[2]);
    if(index>-1){
      thisData.value[index].selected=true; 
    }
  });
  route('/copy?tab='+thisTab);
};

 return (
  <div>
				<div className={style.content}>
					{thisData.value
						.filter((t) => t.grade[0]  && !t.grade[1])
						.map((t) => {
							return 						<div
									className={t.grade[0] == contentIndex.value ? `${style.contentItem}  selected `: style.contentItem}
									onClick={(e) => {
										contentIndex.value = t.grade[0];
									}}
								>
									{t.value}
								</div>
						})}
				</div>
				<div className={style.text}>
					{thisData.value
						.filter((t) => t.grade[0] == contentIndex.value && t.grade[1] )
						.map((t) => {
							if (!t.grade[2] ) {
								return 	<div className={style.textTitle}>{'---'}{t.value}</div>
							}
							return 			<div className={style.textItem} onClick={() => itemClick(t)}>
									<input type="checkbox" checked={t.selected ? true : false} />
									{t.value}
								</div>
						})}
				</div>
				<FixButton onClick={cpyClick} value='复制' type='1' />
			</div>
 )
}
