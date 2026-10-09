import style from './detail.module.css';
import store from 'utils/store.js';
import FixButton from 'com/fix-button.jsx';

export default function Detail({tab=''}) {
	const data=store.getDataByName(tab);
	if(!data){
		return <div>Error...</div>
	}
	const {thisData,current}=data;

	const itemClick = (item) => {
		item.selected = !item.selected;
		thisData.value = [...thisData.value];
	};

	const unSelect = () => {
		const res = thisData.value.filter((t) => t.grade[0] == current.grade[0] && t.grade[1] == current.grade[1] && t.grade[2])
		res.forEach((v)=>{
				v.selected=!v.selected
				if (v.selected) {
					result.value.push(v);
				} else {
					result.value = result.value.filter((t) => t.index != v.index);
				}
			})
		thisData.value = [...thisData.value];
	};

	return <div>	
			<div className={style.text}>	
				{thisData.value
					.filter((t) => t.grade[0] == current.value.grade[0] && t.grade[1] == current.value.grade[1] && t.grade[2])
					.map((t) => {
						return 		<div className={style.item} onClick={() => itemClick(t)}>
								<input type="checkbox" checked={t.selected ? true : false} />
								{t.value}
							</div>
					})}
			</div>
			<FixButton onClick={()=>history.back()} value="返回" type='1' />
		</div>
	
}
