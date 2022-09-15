import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const echartInit = (node, data, title) => {
  const myChart = echarts.init(node)
  // 绘制图表
  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '停车情况',
        type: 'pie',
        radius: '50%',
        // data: [
        //   { value: 120, name: '空车位' },
        //   { value: 80, name: '已使用' }
        // ],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
}

const CarPie = ({ style, data, title }) => {
  const nodeRef = useRef(null)
  useEffect(() => {
    echartInit(nodeRef.current, data, title)
  }, [data, title])
  return (
    <>
      <div ref={nodeRef} style={style} />
    </>
  )
}

export default CarPie
