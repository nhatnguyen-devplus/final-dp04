import { CheckOutlined, CloseOutlined, EyeOutlined, UndoOutlined } from '@ant-design/icons'
import ViewHeader from '@app/components/ViewHeader'
import { getAllRequests } from '@app/redux/requests/actions'
import { Button, Table, Modal, Input, Form, notification } from 'antd'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Requests = () => {
  const { role } = useSelector((state) => state.login)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { dataAll, response } = useSelector((state) => state.requests)
  const dispatch = useDispatch()
  const allRequests = useCallback(() => dispatch(getAllRequests()), [dispatch])
  const { TextArea } = Input
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }

  useEffect(() => {
    if (null !== response) {
      if (response.status && 200 === response.status) {
        openNotificationWithIcon('success', response.message)
      } else {
        openNotificationWithIcon('error', response.message)
      }

      allRequests()
    }
  }, [response])

  useEffect(() => {
    allRequests()
  }, [])

  const onFinish = (values) => {
    console.log(values)
    showModal()
  }
  const showModal = () => {
    setIsModalOpen(!isModalOpen)
    if (isModalOpen) {
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
      dataIndex: 'logofffrom',
      render: (text) => <p>{moment(text).format('YYYY-MM-DD')}</p>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'user',
      render: (text) => <a>{text.name}</a>,
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
      dataIndex: 'createdAt',
      render: (text) => <p>{moment(text).format('YYYY-MM-DD')}</p>,
    },
    ,
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: '15%',
      render: (index, record) => (
        <>
          <Link to={`details/${record._id}`}>
            <Button icon={<EyeOutlined />} type="primary"></Button>
          </Link>
          {'Admin' === role ? (
            <>
              <Button
                className="approve"
                icon={<CheckOutlined />}
                onClick={() => {
                  form.setFieldValue('status', 'Approve'), showModal()
                }}
              ></Button>
              <Button
                className="update"
                icon={<UndoOutlined />}
                onClick={() => {
                  form.setFieldValue('status', 'Change Request'), showModal()
                }}
              ></Button>
            </>
          ) : (
            <>
              {0 === record.approval.length && (
                <Button
                  className="reject"
                  icon={<CloseOutlined />}
                  onClick={() => {
                    form.setFieldValue('status', 'Reject'), showModal()
                  }}
                ></Button>
              )}
            </>
          )}
        </>
      ),
    },
  ]
  return (
    <>
      {0 < dataAll.length && (
        <>
          {contextHolder}
          <ViewHeader breadcrumbs={breadcrumbs} />
          <Table
            bordered
            columns={columns}
            dataSource={dataAll}
            footer={() => 'Click button to view details'}
            title={() => 'List of requests for for leave'}
          />
          <Modal footer={''} open={isModalOpen} title="Type your comment:" onCancel={showModal}>
            <Form form={form} layout="vertical" name="form_in_modal" onFinish={onFinish}>
              <Form.Item name="status">
                <Input readOnly style={{ border: 'none' }} value={status} />
              </Form.Item>
              <Form.Item name="reason">
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
      )}
    </>
  )
}
export default Requests
