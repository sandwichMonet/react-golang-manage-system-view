import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const echartInit = (node, xData, sData, title) => {
  const myChart = echarts.init(node)
  // 绘制图表
  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['业主', '租户', '搬离']
    },
    xAxis: [
      {
        type: 'category',
        // data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        data: xData,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '入住户数',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value} 户'
        }
      },
      {
        type: 'value',
        name: '搬离户数',
        min: 0,
        max: 30,
        interval: 10,
        axisLabel: {
          formatter: '{value} 户'
        }
      }
    ],
    series: [
      {
        name: '业主',
        type: 'bar',
        tooltip: {
          valueFormatter: value => value + ' 户'
        },
        // data: [30, 20, 54, 10, 64, 20, 54, 87, 32, 54, 21, 65]
        data: sData[0]
      },
      {
        name: '租户',
        type: 'bar',
        tooltip: {
          valueFormatter: value => value + ' 户'
        },
        // data: [54, 98, 32, 54, 21, 87, 32, 4, 32, 65, 98, 12]
        data: sData[1]
      },
      {
        name: '搬离',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: value => value + ' 户'
        },
        // data: [12, 5, 6, 8, 9, 3, 4, 0, 6, 5, 7, 3]
        data: sData[2]
      }
    ]
  })
}

const ResidentBar = ({ style, xData, sData, title }) => {
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

export default ResidentBar
