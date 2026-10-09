import { Space, Swiper,Button } from 'antd-mobile'
import {signal} from '@preact/signals'
import { useRef } from 'preact/hooks'

import styles from './demo1.module.css'

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']
const index=signal(2)

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div className={styles.content} style={{ background: color }}>
      {index + 1}
    </div>
  </Swiper.Item>
))

function Indicator({total,current}){
	const m=(new Array(total)).fill(0)
	return(<div style='position:absolute;bottom:5px;display:flex;justify-content:center;width:100%'>
		{m.map((v,i)=>{
			if(i==current){
				return <span style='color:blue;margin:5px;'>O</span>
			}else if(i<current){
				return <span style='color:black;margin:5px;'>{'<'}</span>
			}else{
				return <span style='color:black;margin:5px;'>{'>'}</span>
			}
		})}
	</div>)
}

export default () => {
	const ref=useRef()
  return (
    <>
        <Swiper
          trackOffset={10}
          slideSize={80}
					ref={ref}
          style={{
            '--border-radius': '8px',
          }}
          defaultIndex={index.value}
					indicator={(total,current)=><Indicator total={total} current={current}></Indicator>}
        >
          {items}
        </Swiper>
				<Button onClick={()=>{ref.current.swipePrev()}}>上一页</Button>
				<Button onClick={()=>{ref.current.swipeNext()}}>下一页</Button>
        <Space direction='vertical' block>
          <Swiper stuckAtBoundary={false} slideSize={80} defaultIndex={3}>
            {items}
          </Swiper>
        </Space>

        <Swiper slideSize={80} trackOffset={10} stuckAtBoundary={false}>
          {items}
        </Swiper>

        <Swiper slideSize={70} trackOffset={15} loop stuckAtBoundary={false}>
          {items}
        </Swiper>
    </>
  )
}