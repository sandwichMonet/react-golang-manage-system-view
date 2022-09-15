import Bar from './Bar'
import Line from './Line'
import CarPie from './CarPie'
import ResidentBar from './ResidentBar'
import { Row, Col, Card } from 'antd'

const chartData = {
  electricLine: {
    xData: [
      '00:00',
      '01:15',
      '02:30',
      '03:45',
      '05:00',
      '06:15',
      '07:30',
      '08:45',
      '10:00',
      '11:15',
      '12:30',
      '13:45',
      '15:00',
      '16:15',
      '17:30',
      '18:45',
      '20:00',
      '21:15',
      '22:30',
      '23:45'
    ],
    sData: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
  },
  areaBar: {
    xData: ['建筑面积', '绿化保留面积', '空闲面积'],
    sData: [30, 15, 55]
  }
}
const Dashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Line
              style={{ width: '100%', height: '400px' }}
              xData={chartData.electricLine.xData}
              sData={chartData.electricLine.sData}
              title="小区每户每日用电量"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Bar
              style={{ width: '500px', height: '400px' }}
              xData={chartData.areaBar.xData}
              sData={chartData.areaBar.sData}
              title="社区占用面积"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <CarPie
              style={{ width: '100%', height: '400px' }}
              data={[
                { value: 120, name: '空车位' },
                { value: 80, name: '已使用' }
              ]}
              title="停车场情况"
            />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: '20px' }}>
        <ResidentBar
          style={{ width: '85%', height: '400px' }}
          xData={['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']}
          sData={[
            [30, 20, 54, 10, 64, 20, 54, 87, 32, 54, 21, 65],
            [54, 98, 32, 54, 21, 87, 32, 4, 32, 65, 98, 12],
            [12, 5, 6, 8, 9, 3, 4, 0, 6, 5, 7, 3]
          ]}
          title="去年居民入住情况"
        />
      </Card>
    </>
  )
}

export default Dashboard
