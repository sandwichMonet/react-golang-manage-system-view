import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const echartInit = (node, xData, sData, title) => {
  const myChart = echarts.init(node)
  // 绘制图表
  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {},
    xAxis: {
      data: xData,
      axisLabel: {
        formatter: '{value} (%)'
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: '{value} %'
      }
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: sData,
        tooltip: {
          valueFormatter: value => value + ' %'
        }
      }
    ]
  })
}

const Bar = ({ style, xData, sData, title }) => {
  const nodeRef = useRef(null)
  useEffect(() => {
    echartInit(nodeRef.current, xData, sData, title)
  }, [xData, sData, title])
  return (
    <>
      <div ref={nodeRef} style={style} />
    </>
  )
}

export default Bar
