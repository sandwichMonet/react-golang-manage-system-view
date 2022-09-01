import { Breadcrumb, Button, Card, DatePicker, Form, Radio, Select, Table, Tag, Space, Popconfirm } from 'antd'
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import img404 from '@/assets/error.png'
import { getArticles, deleteArticle } from '@/api'
import { history } from '@/utils'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
const Article = () => {
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => <img src={cover || img404} width={80} height={60} alt="" />
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => history.push(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="确定要删除该条文章吗？"
              onConfirm={() => reqDeleteArticle(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // 动态渲染频道列表
  const { channelStore } = useStore()

  useEffect(() => {
    try {
      channelStore.fetchChannel()
    } catch {}
  }, [channelStore])

  // 动态渲染文章列表
  const [articleList, setArticleList] = useState({
    list: [],
    count: 0
  })
  // 发送请求的参数
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })
  useEffect(() => {
    async function fetchArticle() {
      const result = await getArticles(params)
      const { results, total_count } = result.data.data
      setArticleList({
        list: results,
        count: total_count
      })
    }
    fetchArticle()
  }, [params])

  //筛选功能
  const onSearch = values => {
    const { status, channel_id, date } = values
    // 格式化数据
    const _params = {}
    // 格式化status
    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params参数
    setParams({
      ...params,
      ..._params
    })
  }

  // 分页功能
  const pageChange = page => {
    setParams({
      ...params,
      page
    })
  }

  // 删除功能
  const reqDeleteArticle = async data => {
    await deleteArticle(data.id)
    // 更新articleList
    setParams({
      page: 1,
      per_page: 10
    })
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator>
            <BreadcrumbItem>
              <Link to="/home">首页</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>内容管理</BreadcrumbItem>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onSearch}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" defaultValue="推荐" style={{ width: 120 }}>
              {channelStore.channels.map(item => (
                <Select.Option value={item.id} key={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <DatePicker.RangePicker locale={locale}></DatePicker.RangePicker>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* table */}
      <Card title={`根据筛选条件共查询到 ${articleList.count} 条结果：`}>
        <Table
          columns={columns}
          dataSource={articleList.list}
          pagination={{
            position: ['bottomCenter'],
            current: params.page,
            pageSize: params.per_page,
            onChange: pageChange
          }}
        />
      </Card>
    </div>
  )
}

export default observer(Article)
