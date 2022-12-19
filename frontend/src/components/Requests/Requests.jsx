import { CheckOutlined, CloseOutlined, EditOutlined, EyeOutlined, UndoOutlined } from '@ant-design/icons'
import ViewHeader from '@app/components/ViewHeader'
import { getAllRequests, updateRequest } from '@app/redux/requests/actions'
import { Button, Table, Modal, Input, Form, notification, Tooltip } from 'antd'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Requests = () => {
  const { data } = useSelector((state) => state.login)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { dataAll, response } = useSelector((state) => state.requests)
  const dispatch = useDispatch()
  const allRequests = useCallback(() => dispatch(getAllRequests()), [dispatch])
  const updateReq = useCallback((data) => dispatch(updateRequest(data)), [dispatch])
  const { TextArea } = Input
  const [form] = Form.useForm()
  const [byId, setById] = useState()
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
    updateReq({
      id: byId,
      values,
    })
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
  const formatDate = (date) => moment(date).format('YYYY-MM-DD')
  const columns = [
    {
      title: '#',
      render: (text, record, index) => index + 1,
      width: '2%',
    },
    {
      title: 'Day Off',
      dataIndex: 'logofffrom',
      render: (text, record) => (
        <p>{text === record.logoffto ? formatDate(text) : `${formatDate(text)} - ${formatDate(record.logoffto)}`}</p>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'user',
      render: (text) => <Link to="">{text.name}</Link>,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <div className="status">
          <p className={0 < record.approval.length ? `status-approval` : `status-${text}`}>
            {0 < record.approval.length ? `Approval ${record.approval.length}/${record.masters.length}` : text}
          </p>
        </div>
      ),
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
      render: (index, record) => (
        <>
          <Link to={`details/${record._id}`}>
            <Button icon={<EyeOutlined />} type="primary"></Button>
          </Link>
          {record.user._id !== data._id ? (
            <>
              {'Pending' === record.status && !record.approval.includes(data._id) && (
                <>
                  <Tooltip placement="top" title="Approve">
                    <Button
                      className="approve"
                      icon={<CheckOutlined />}
                      onClick={() => {
                        form.setFieldValue('status', 'Approve'), showModal(), setById(record._id)
                      }}
                    ></Button>
                  </Tooltip>
                  <Tooltip placement="top" title="Change Request">
                    <Button
                      className="update"
                      icon={<UndoOutlined />}
                      onClick={() => {
                        form.setFieldValue('status', 'Change Request'), showModal(), setById(record._id)
                      }}
                    ></Button>
                  </Tooltip>
                  <Tooltip placement="top" title="Reject">
                    <Button
                      className="reject"
                      icon={<CloseOutlined />}
                      onClick={() => {
                        form.setFieldValue('status', 'Reject'), showModal(), setById(record._id)
                      }}
                    ></Button>
                  </Tooltip>
                </>
              )}
            </>
          ) : (
            <>
              {0 === record.approval.length && 'Pending' === record.status ? (
                <>
                  <Tooltip placement="top" title="Cancel">
                    <Button
                      className="reject"
                      icon={<CloseOutlined />}
                      onClick={() => {
                        form.setFieldValue('status', 'Cancel'), showModal(), setById(record._id)
                      }}
                    ></Button>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Link to={`change/${record._id}`}>
                    <Tooltip placement="top" title="Change">
                      <Button className="update" icon={<EditOutlined />}></Button>
                    </Tooltip>
                  </Link>
                </>
              )}
            </>
          )}
        </>
      ),
    },
  ]
  return (
    <>
      {contextHolder}
      <ViewHeader breadcrumbs={breadcrumbs} />
      <Table
        bordered
        columns={columns}
        dataSource={0 < dataAll.length && dataAll}
        footer={() => 'Click button to view details'}
        title={() => 'List of requests for for leave'}
      />
      <Modal footer={''} open={isModalOpen} title="Type your comment:" onCancel={showModal}>
        <Form form={form} layout="vertical" name="form_in_modal" onFinish={onFinish}>
          <Form.Item name="status">
            <Input readOnly style={{ border: 'none' }} />
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
  )
}
export default Requests
