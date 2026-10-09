import {useSignal}from 'my';
import style from './about.module.css';
 import store$ from 'utils/store.js'

export default function About() {
	const data = useSignal({
		myname: store$.myname,
		mymail: store$.mymail,
		mytel: store$.mytel,
		mycity: store$.mycity,
	});

	const comfirm = () => {
		store$.myname = data.value.myname;
		store$.mymail = data.value.mymail;
		store$.mytel = data.value.mytel;
		store$.mycity = data.value.mycity;
		localStorage.myname = data.value.myname;
		localStorage.mytel = data.value.mytel;
		localStorage.mymail = data.value.mymail;
		localStorage.mycity = data.value.mycity;
		history.back();
	};

	return <div>
			<div className={style.item}>
				姓名：
				<input
					className={style.input}
					type="text"
					value={data.value.myname}
					onInput={(e) => {
						data.value.myname = e.target.value;
					}}
				/>
			</div>
			<div className={style.item}>
				电话：
				<input
					className={style.input}
					type="text"
					value={data.value.mytel}
					onInput={(e) => {
						data.value.mytel = e.target.value;
					}}
				/>
			</div>
			<div className={style.item}>
				邮箱：
				<input
					className={style.input}
					type="text"
					value={data.value.mymail}
					onInput={(e) => {
						data.value.mymail = e.target.value;
					}}
				/>
			</div>
			<div className={style.item}>
				城市：
				<input
					className={style.input}
					type="text"
					value={data.value.mycity}
					onInput={(e) => {
						data.value.mycity = e.target.value;
					}}
				/>
			</div>
			<div className={style.item}>
				<button className={style.button} onClick={() => history.back()}>取消</button>
				<button className={style.button} onClick={comfirm}>确认</button>
			</div>
			<div className={style.text}>
				应用{store$.version}
				<br />
				数据{store$.mydata.version}
			</div>
		</div>
}
