


import { useSignal, useSignalEffect } from '@preact/signals';
import { Button, Card, Toast, Ellipsis, FloatingBubble, CheckList } from 'antd-mobile';
import { useEffect } from 'preact/hooks';
import { getDataByStep, setDataByStep } from '../helper';
import style from '../style.module.css';

const step = 4;
const data = [
	'原房质量检查',
	'开工准备与施工交底',
	'拆除检查',
	'新建检查',
	'水电技术交底',
	'水电开槽检查',
	'水电隐蔽施工检查',
	'水电隐蔽工程验收',
	'闭水试验验收',
	'瓦/木工基础施工检查',
	'瓦/木工面层施工检查',
	'中期阶段验收',
	'腻子批嵌检查',
	'涂饰施工检查',
	'竣工验收'
];

export default ({ cancelNext }) => {
	const checked = useSignal([]);
	const context = useSignal([]);
	const newContext = useSignal('');

	useEffect(() => {
		const { checkedValue, contextValue } = getDataByStep(step);
		checked.value = checkedValue;
		context.value = contextValue.length > 0 ? contextValue : data;
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
		context.value = [...context.value, newContext.value];
		checked.value = [newContext.value];
		cancelNext.value = !checked.value.length;
		newContext.value = '';
	};

	return (
		<div className={style.container}>
			<h1>五、下次监理上门检查节点 </h1>
			<CheckList value={checked.value} onChange={onChange}>
				{context.value.map(item => (
					<CheckList.Item value={item} style={{ '--active-background-color': '#9cf' }}>
						{item}
					</CheckList.Item>
				))}
			</CheckList>

			<input
				type="text"
				value={newContext.value}
				className={style.input}
				onInput={e => {
					newContext.value = e.target.value;
				}}
			/>
			<button onClick={add}>添加</button>
		</div>
	);
};
