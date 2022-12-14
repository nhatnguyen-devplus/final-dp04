import { CheckOutlined, CloseOutlined, EditOutlined, EyeOutlined, UndoOutlined } from '@ant-design/icons'
import { BrRequestsIndexAdmin, BrRequestsIndexClient } from '@app/components/Breadcrumbs/data'
import ViewHeader from '@app/components/ViewHeader'
import { getAllRequests, updateRequest } from '@app/redux/requests/actions'
import { Button, Table, Modal, Input, Form, notification, Tooltip, Tag, Spin } from 'antd'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Requests.scss'

const Requests = () => {
  const { data, role } = useSelector((state) => state.login)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState()
  const { dataAll, response, loading } = useSelector((state) => state.requests)
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

  const switchColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'processing'
      case 'Change Request':
        return 'warning'
      case 'Approve':
        return 'success'
      case 'Reject':
        return 'error'
      case 'Cancel':
        return 'default'
      default:
        return null
    }
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
      width: '16%',
      render: (text, record) => (
        <p>{text === record.logoffto ? formatDate(text) : `${formatDate(text)} - ${formatDate(record.logoffto)}`}</p>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'contentlog',
      width: '3%',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '3%',
    },
    {
      title: 'Name',
      dataIndex: 'user',
      render: (text) => <Link to="">{text?.name}</Link>,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      render: (text) => <p className="line-clamp-2">{text}</p>,
      width: '20%',
    },
    {
      title: 'Status',
      width: '10%',
      dataIndex: 'status',
      render: (text, record) => (
        <div className="status">
          <Tag color={switchColor(0 < record.approval.length ? `Approve` : text)}>
            {0 < record.approval.length ? `Approval ${record.approval.length}/${record.masters.length}` : text}
          </Tag>
        </div>
      ),
    },
    ,
    {
      title: 'Create At',
      width: '10%',
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
            <Tooltip placement="top" title="View">
              <Button icon={<EyeOutlined />} type="primary"></Button>
            </Tooltip>
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
                        setStatus({
                          action: 'Approve',
                          color: 'success',
                        })
                      }}
                    ></Button>
                  </Tooltip>
                  <Tooltip placement="top" title="Change Request">
                    <Button
                      className="update"
                      icon={<UndoOutlined />}
                      onClick={() => {
                        form.setFieldValue('status', 'Change Request'), showModal(), setById(record._id)
                        setStatus({
                          action: 'Change Request',
                          color: 'warning',
                        })
                      }}
                    ></Button>
                  </Tooltip>
                  <Tooltip placement="top" title="Reject">
                    <Button
                      className="reject"
                      icon={<CloseOutlined />}
                      onClick={() => {
                        form.setFieldValue('status', 'Reject'), showModal(), setById(record._id)
                        setStatus({
                          action: 'Reject',
                          color: 'error',
                        })
                      }}
                    ></Button>
                  </Tooltip>
                </>
              )}
            </>
          ) : (
            <>
              <Link to={`change/${record._id}`}>
                <Tooltip placement="top" title="Change">
                  <Button className="update" icon={<EditOutlined />}></Button>
                </Tooltip>
              </Link>
              <Tooltip placement="top" title="Cancel">
                <Button
                  className="reject"
                  icon={<CloseOutlined />}
                  onClick={() => {
                    form.setFieldValue('status', 'Cancel'),
                      showModal(),
                      setById(record._id),
                      setStatus({
                        action: 'Cancel',
                        color: 'default',
                      })
                  }}
                ></Button>
              </Tooltip>
            </>
          )}
        </>
      ),
    },
  ]
  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <ViewHeader breadcrumbs={'Admin' === role ? BrRequestsIndexAdmin : BrRequestsIndexClient} />
        <Table
          bordered
          columns={columns}
          dataSource={0 < dataAll.length ? dataAll.reverse() : []}
          footer={() => 'Click button to view details'}
          title={() => 'List of requests for for leave'}
        />
        <Modal footer={''} open={isModalOpen} title="Type your comment:" onCancel={showModal}>
          <Form form={form} layout="vertical" name="form_in_modal" onFinish={onFinish}>
            <Form.Item name="status">
              <Tag color={status?.color}>{status?.action}</Tag>
              <Input readOnly style={{ display: 'none' }} />
            </Form.Item>
            <Form.Item
              name="comment"
              rules={
                'Approve' !== status?.action && [
                  {
                    required: true,
                    message: 'Please type comment!',
                  },
                ]
              }
            >
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
      </Spin>
    </>
  )
}
export default Requests
