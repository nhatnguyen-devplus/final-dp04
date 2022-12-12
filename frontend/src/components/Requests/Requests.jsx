import { CheckOutlined, CloseOutlined, EyeOutlined, UndoOutlined } from '@ant-design/icons'
import ViewHeader from '@app/components/ViewHeader'
import { Button, Table, Modal, Input, Form } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { data } from './Requests.data'

const Requests = () => {
  const { role } = useSelector((state) => state.login)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { TextArea } = Input
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log(values)
    showModal()
  }
  const showModal = () => {
    setIsModalOpen(!isModalOpen)
    if(true===isModalOpen){
      form.resetFields()
    }
  }
  const breadcrumbs = {
    data: [
      {
        title: 'Requests ',
        path: '/admin/requets',
      },
    ],
    spread: '/',
  }
  const columns = [
    {
      title: '#',
      render: (text, record, index) => index + 1,
      width: '2%',
    },
    {
      title: 'Day Off',
      dataIndex: 'dayoff',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'user',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    ,
    {
      title: 'Create At',
      dataIndex: 'created_at',
    },
    ,
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: '15%',
      render: (index, record) => (
        <>
          <Link to={`details/${record.key}`}>
            <Button icon={<EyeOutlined />} type="primary"></Button>
          </Link>
          {'Admin' === role && (
            <>
              <Button
                className="approve"
                icon={<CheckOutlined />}
                onClick={() => {
                  form.setFieldValue('status', 1), showModal()
                }}
              ></Button>
              <Button
                className="reject"
                icon={<CloseOutlined />}
                onClick={() => {
                  form.setFieldValue('status', 2), showModal()
                }}
              ></Button>
              <Button
                className="update"
                icon=<UndoOutlined />
                onClick={() => {
                  form.setFieldValue('status', 3), showModal()
                }}
              ></Button>
            </>
          )}
        </>
      ),
    },
  ]
  return (
    <>
      <ViewHeader breadcrumbs={breadcrumbs} />
      <Table
        bordered
        columns={columns}
        dataSource={data}
        footer={() => 'Click button to view details'}
        title={() => 'List of requests for for leave'}
      />
      <Modal footer={''} open={isModalOpen} title="Type your comment:" onCancel={showModal}>
        <Form form={form} layout="vertical" name="form_in_modal" onFinish={onFinish}>
          <Form.Item name="status">
            <Input readOnly style={{ border: 'none' }} value={status} />
          </Form.Item>
          <Form.Item name="comment">
            <TextArea placeholder="Your comment" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={showModal}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default Requests
