import { Button, Card, Toast, Ellipsis, FloatingBubble, CheckList } from 'antd-mobile';
import { useSignal } from '@preact/signals';
import Main from './main';

export default () => {
	const step = useSignal(1);

	const cancelNext = useSignal(false);

	return (
		<>
			<Main step={step.value} cancelNext={cancelNext} />
			{step.value > 1 && (
				<FloatingBubble
					style={{
						'--initial-position-bottom': '24px',
						'--initial-position-left': '24px',
						'--edge-distance': '24px'
					}}
					onClick={() => {
						if (step.value > 1) step.value--;
					}}
				>
					◀
				</FloatingBubble>
			)}

			{!cancelNext.value && (
				<FloatingBubble
					style={{
						'--initial-position-bottom': '24px',
						'--initial-position-right': '24px',
						'--edge-distance': '24px'
					}}
					onClick={() => {
						if (step.value < 7 && !cancelNext.value) step.value++;
					}}
				>
					▶
				</FloatingBubble>
			)}
		</>
	);
};
