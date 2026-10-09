import { useSignal, useSignalEffect } from '@preact/signals';
import { Button, Card, Toast, Ellipsis, FloatingBubble, CheckList } from 'antd-mobile';
import { useEffect } from 'preact/hooks';
import { getDataByStep, setDataByStep } from '../helper';
import style from '../style.module.css';

const step = 2;

export default ({ cancelNext }) => {
	const checked = useSignal([]);
	const context = useSignal([]);
	const newContext = useSignal('');

	useEffect(() => {
		const { checkedValue, contextValue } = getDataByStep(step);
		checked.value = checkedValue;
		context.value = contextValue.length > 0 ? contextValue : [''];
		newContext.value = context.value[0];
		if (!newContext.value.trim().length) cancelNext.value = true;
		else cancelNext.value = false;
	}, []);

	useSignalEffect(() => {
		setDataByStep(step, { checkedValue: checked.value, contextValue: context.value });
	});

	const onInput = e => {
		newContext.value = e.target.value;
		context.value = [newContext.value];
		checked.value = context.value;
		cancelNext.value = !newContext.value.trim().length;
	};

	return (
		<>
			<h1>三、本次工作装修建议及确认事项</h1>
			<textarea style={{ width: '90%', height: '70vh', marginLeft: '10px' }} onInput={onInput}>
				{newContext.value}{' '}
			</textarea>
		</>
	);
};
