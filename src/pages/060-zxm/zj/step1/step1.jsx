import { useSignal, useSignalEffect } from '@preact/signals';
import { Button, Card, Toast, Ellipsis, FloatingBubble, CheckList } from 'antd-mobile';
import { useEffect } from 'preact/hooks';
import { getDataByStep, setDataByStep } from '../helper';
import style from '../style.module.css';

const data = ['客户', '客户家人', '项目经理', '工人', '设计师', '施工方监理'];
const step = 0;

const init = () => {
	return data.map(item => ({ value: item, number: 1 }));
};

export default ({ cancelNext }) => {
	const checked = useSignal([]);
	const context = useSignal([]);
	const newContext = useSignal('');

	useEffect(() => {
		const { checkedValue, contextValue } = getDataByStep(step);
		checked.value = checkedValue;
		context.value = contextValue.length > 0 ? contextValue : init();
		if (!checked.value.length) cancelNext.value = true;
		else cancelNext.value = false;
	}, []);

	useSignalEffect(() => {
		setDataByStep(step, { checkedValue: checked.value, contextValue: context.value });
	});

	const onChange = value => {
		checked.value = value;
		cancelNext.value = !checked.value.length;
	};

	const add = () => {
		context.value = [...context.value, { value: newContext.value, number: 1 }];
		checked.value = [...checked.value, newContext.value];
		cancelNext.value = !checked.value.length;
		newContext.value = '';
	};

	return (
		<div div className={style.container}>
			<h1>一、现场人员</h1>
			<CheckList value={checked.value} onChange={onChange} multiple>
				{context.value.map(item => {
					return (
						<CheckList.Item value={item.value}>
							<div className={style.itemContainer}>
								<div className={style.itemValue}>{item.value}</div>
								
								<button
									className={style.btnAdd}
									onClick={e => {
										item.number--;
										context.value = [...context.value];
										e.stopPropagation();
									}}
								>
									-
								</button>
								<button
									className={style.btnAdd}
									onClick={e => {
										item.number++;
										if(!checked.value.includes(item.value)){
											checked.value=[...checked.value,item.value]
											cancelNext.value = !checked.value.length;
										}
										context.value = [...context.value];
										e.stopPropagation();
									}}
								>
									+
								</button>
								<div className={style.itemNumber}>{item.number}人</div>
							</div>
						</CheckList.Item>
					);
				})}
			</CheckList>

			<input
				type="text"
				value={newContext.value}
				className={style.input}
				onInput={e => {
					newContext.value = e.target.value;
				}}
			/>
			<button className={style.btnAdd} onClick={add}>添加</button>
		</div>
	);
};
