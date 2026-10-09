import { Button, Modal, Space, Toast, Divider } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'

export default () => {
  return (
    <>
        <Space direction='vertical' block>
          <Button
            block
            onClick={() =>
              Modal.alert({
                content: '人在天边月上明',
                onConfirm: () => {
                  console.log('Confirmed')
                },
              })
            }
          >
            最简单的弹窗
          </Button>
          <Button
            block
            onClick={() => {
              Modal.alert({
                content: '点击遮罩关闭',
                closeOnMaskClick: true,
              })
            }}
          >
            点击遮罩关闭
          </Button>
          <Button
            block
            onClick={() => {
              Modal.alert({
                title: '带关闭图标的弹窗',
                content: '右上角有个关闭的小图标，点击它也可以关闭弹窗',
                showCloseButton: true,
              })
            }}
          >
            显示关闭图标
          </Button>
        </Space>

        <Space direction='vertical' block>
          <Button
            block
            onClick={() => {
              Modal.show({
                content: '人在天边月上明，风初紧，吹入画帘旌',
                closeOnAction: true,
                actions: [
                  {
                    key: 'online',
                    text: '在线阅读',
                    primary: true,
                  },
                  {
                    key: 'download',
                    text: '下载文件',
                  },
                  {
                    key: 'share',
                    text: '分享',
                  },
                ],
              })
            }}
          >
            自定义按钮
          </Button>
          <Divider />
          <Button
            block
            onClick={() =>
              Modal.confirm({
                content: '是否提交申请',
                onConfirm: async () => {
                  await sleep(3000)
                  Toast.show({
                    icon: 'success',
                    content: '提交成功',
                    position: 'bottom',
                  })
                },
              })
            }
          >
            异步操作执行成功
          </Button>
          <Button
            block
            onClick={() =>
              Modal.confirm({
                content: '是否提交申请',
                onConfirm: async () => {
                  await sleep(3000)
                  Toast.show({
                    icon: 'fail',
                    content: '提交失败',
                    position: 'bottom',
                  })
                  throw new Error()
                },
              })
            }
          >
            异步操作执行失败
          </Button>
          <Button
            block
            onClick={() => {
              Modal.show({
                content: '点击遮罩关闭',
                closeOnMaskClick: true,
              })
            }}
          >
            无操作按钮
          </Button>
        </Space>
    </>
  )
}