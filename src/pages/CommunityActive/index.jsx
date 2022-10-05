import { Card, Button, Tag, Space, Table, Row, Col, Divider, Drawer, Popconfirm } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { PlusOutlined, DeleteFilled } from '@ant-design/icons'
import './index.scss'
import { useState } from 'react'

// 定义antd默认属性
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
)

const CommunityActive = () => {
  // 点击详情按钮弹出的抽屉效果
  const [openDrawer, setOpenDrawer] = useState(false)
  const drawerOpen = () => setOpenDrawer(true)
  const drawerClose = () => setOpenDrawer(false)

  // 点击删除按钮异步删除气泡框
  const [deletePopconfirm, setDeletePopconfirm] = useState(false)
  const [popconfirmLoading, setPopconfirmLoading] = useState(false)
  const showPopconfirm = () => setDeletePopconfirm(true)
  const handleAsyncDelete = () => {
    setPopconfirmLoading(true)
    // 发送请求等异步操作
    setTimeout(() => {
      setPopconfirmLoading(false)
      setDeletePopconfirm(false)
    }, 3000)
  }

  // 活动表格数据
  const activeTableData = {
    dataColumns: [
      {
        title: '编号',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: '5%',
        render: (text, record, index) => index + 1
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '20%',
        align: 'center'
      },
      {
        title: '说明',
        dataIndex: 'desc',
        align: 'center',
        width: '15%',
        key: 'desc'
      },
      {
        title: '发布时间',
        dataIndex: 'updated_at',
        align: 'center',
        width: '15%',
        key: 'update_at'
      },
      {
        title: '发布者',
        dataIndex: 'publisher',
        align: 'center',
        width: '10%',
        key: 'publisher'
      },
      {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        align: 'center',
        render: (_, { tags }) => (
          <>
            {tags.map(tag => {
              let color = 'blue'
              if (tag === '官方信息') {
                color = 'pink'
              } else if (tag === '紧急通知') {
                color = 'red'
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              )
            })}
          </>
        )
      },
      {
        title: '操作',
        key: 'index',
        align: 'center',
        width: '10%',
        render: (_, record) => (
          <Space size="middle">
            {/* 点击详情按钮时需要把内容传递过去 */}
            {console.log(record)}
            <Button
              type="primary"
              icon={<InfoCircleOutlined />}
              size="middle"
              style={{ width: '3rem' }}
              onClick={drawerOpen}
            />
            {/* TODO:数据缺少一个布尔类型的数据用来控制是否显示删除确认框。
                如果共用一个变量控制是否显示，则会出现同时显示的情况 */}
            <Popconfirm
              title="确认删除?"
              open={deletePopconfirm}
              onConfirm={handleAsyncDelete}
              okButtonProps={{
                loading: popconfirmLoading
              }}
              onCancel={() => setDeletePopconfirm(false)}
            >
              <Button danger icon={<DeleteFilled />} size="middle" style={{ width: '3rem' }} onClick={showPopconfirm} />
            </Popconfirm>
          </Space>
        )
      }
    ],
    dataList: [
      {
        key: '1',
        title: '共叙邻里深情，共建温暖社区',
        desc: '社区组织开展形式多样的文体活动',
        updated_at: '2022-03-31 21:39:00',
        publisher: '社区居委会',
        tags: ['官方信息', '紧急通知']
      },
      {
        key: '2',
        title: '“艺术创想，共促融合”社区共融活动',
        desc: '促进精神康复者与社区居民的正向互动',
        updated_at: '2022-03-31 21:34:49',
        publisher: '社区文艺部',
        tags: ['官方信息', '社区活动']
      },
      {
        key: '3',
        title: '大力健身 强身健体',
        desc: '社区大力健身房开业',
        updated_at: '2022-02-25 13:37:49',
        publisher: '大力健身房',
        tags: ['商铺信息']
      }
    ]
  }
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
        <Card>
          <Table columns={activeTableData.dataColumns} dataSource={activeTableData.dataList} />
        </Card>
      </div>
      <Drawer width={640} placement="right" closable={false} onClose={drawerClose} open={openDrawer}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24
          }}
        >
          User Profile
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content="Lily" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content="AntDesign@example.com" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="HangZhou" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="China🇨🇳" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="February 2,1900" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Message" content="Make things as simple as possible but no simpler." />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a href>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={<a href="http://github.com/ant-design/ant-design/">github.com/ant-design/ant-design/</a>}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  )
}
export default CommunityActive
