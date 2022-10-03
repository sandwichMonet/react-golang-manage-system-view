import { Card, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.scss'
const CommunityActive = () => {
  return (
    <>
      <div className="active-header">
        <Card
          title="社区活动管理"
          extra={
            <Button type="primary" size="middle" icon={<PlusOutlined />} style={{ width: '10rem' }}>
              新增活动
            </Button>
          }
        ></Card>
      </div>
      <div className="active-list">
        <Card>我是社区活动列表展示</Card>
      </div>
    </>
  )
}
export default CommunityActive
