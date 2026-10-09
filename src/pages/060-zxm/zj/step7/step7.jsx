import { useSignal, useSignalEffect } from '@preact/signals';
import { Button, Card, Toast, Ellipsis, FloatingBubble, CheckList, Dialog } from 'antd-mobile';
import FixButton from '@com/fix-button';
import { copyToClipboard } from './copy-to-clipboard';
import { useEffect } from 'preact/hooks';
import { getDataByStep, setDataByStep } from '../helper';

const getData = () => {
	const count = 5;
	const res = [];
	for (let i = 0; i < count; i++) {
		const { checkedValue } = getDataByStep(i);
		res.push(checkedValue);
	}
	return res;
};

const reSetData = () => {
	const count = 5;
	for (let i = 0; i < count; i++) {
		setDataByStep(i, {});
	}
};

export default ({ cancelNext }) => {
	const context = useSignal('');

	useEffect(() => {
		cancelNext.value = true;
		const data = getData();
		context.value = format(data);
	}, []);

	function getStep1() {
		const { checkedValue, contextValue } = getDataByStep(0);
		let res = '';
		for(let item of contextValue){
			if(checkedValue.includes(item.value)){
				if (res) res += ', ';
				res += ` ${item.value} ${item.number}人`;
			}
		}
		return res;
	}

	function getStep4(data) {
		const topData = data.filter(item => !item.grade[2]);
		let res = '';
		for (let i = 0; i < topData.length; i++) {
			res += `  ${i + 1}. ${topData[i].value}\n`;
			const child = data.filter(item => item.grade[0] == topData[i].grade[0] && item.grade[1] == topData[i].grade[1] && item.grade[2]);
			if (!child.length) continue;
			for (let j = 0; j < child.length; j++) {
				res += `    ${j + 1}) ${child[j].value}\n`;
			}
		}
		return res;
	}

	/**
	 * @param {Object} temp
	 */
	function format(temp) {
		return `
  
一、现场人员:
  ${getStep1()}

二、今日工作内容:
  ${temp[1][0]}，现场检查结果已跟客户沟通，确认后离场


三、本次工作装修建议及确认事项:
${temp[2][0]}

四、后续施工注意事项:
${getStep4(temp[3])}

五、下次监理上门检查节点:      
  ${temp[4][0]}      		
		`;
	}

	const copy = async () => {
		copyToClipboard(context.value);
		Dialog.confirm({
			title: '确认清除所有选择',
			content: '复制成功，是否清空选择？',
			onConfirm: async () => {
				reSetData();
				Toast.show({
					icon: 'success'
				});
				setTimeout(() => window.history.back(), 20);
			}
		});
	};

	return (
		<>
			<textarea disabled style={{ width: '90%', height: '70vh' }}>
				{context.value}{' '}
			</textarea>
			<FixButton onClick={copy}>❏</FixButton>
		</>
	);
};
