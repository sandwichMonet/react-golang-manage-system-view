import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { getArticle, updateArticle, addArticle } from '@/api'
import { useSearchParams } from 'react-router-dom'
import './index.scss'

const Publish = () => {
  const navigate = useNavigate()
  // 展示编辑时文案信息
  const [params] = useSearchParams()
  const articleId = params.get('id')

  const onFinish = async value => {
    // 处理数据
    const { channel_id, content, title, type } = value
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => {
          return item.url
        })
      }
    }

    if (articleId) {
      // 如果有文章id说明该文章已存在，则进行修改操作
      const result = await updateArticle(params, articleId)

      if (result.data.message === 'OK') {
        message.success('修改成功')
        navigate('/article')
      }
    } else {
      const result = await addArticle(params)
      if (result.data.message === 'OK') {
        message.success('发表成功')
      }
    }
  }
  const publishForm = useRef(null)
  const { channelStore } = useStore()
  useEffect(() => {
    async function reqGetArticle() {
      const result = await getArticle(articleId)
      const { cover, ...formValue } = result.data.data
      // 动态设置表单数据
      publishForm.current.setFieldsValue({ ...formValue, type: cover.type })

      // 格式化显示封面图片
      const imageList = cover.images.map(url => ({ url }))
      setFileList(imageList)
      setMaxCount(cover.type)
      fileListRef.current = imageList
    }
    if (articleId) {
      reqGetArticle()
    }
    try {
      channelStore.fetchChannel()
    } catch {}
  }, [channelStore, articleId])
  // 频道列表
  const { channels } = channelStore

  // 上传图片
  const [fileList, setFileList] = useState([])
  // 使用ref暂存所有图片
  const fileListRef = useRef([])
  const onUploadChange = info => {
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    setFileList(fileList)
    fileListRef.current = fileList
  }

  // 切换图片type并修改对应count
  const [maxCount, setMaxCount] = useState(1)
  const changeImgType = e => {
    const count = e.target.value
    setMaxCount(count)
    if (count === 1) {
      // 只展示一张
      const firstImg = fileListRef.current[0]
      setFileList(firstImg ? [firstImg] : [])
    } else if (count === 3) {
      // 展示三张
      setFileList(fileListRef.current)
    }
  }

  // 展示当前所编辑的文章内容

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{articleId ? '修改文章' : '发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ content: '' }}
          ref={publishForm}
          onFinish={onFinish}
        >
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: '请选择文章频道' }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map(item => (
                <Select.Option value={item.id} key={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeImgType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {maxCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={maxCount}
                multiple={maxCount > 1}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入文章内容' }]}>
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '修改文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default observer(Publish)
