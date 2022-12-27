import { updateRequest } from '@app/redux/requests/actions'
import { Button, Form, Input, Modal, notification, Select, Spin } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

const RequestAction = () => {
  const [status, setStatus] = useState(null)
  const [showModal, setShowModal] = useState(null)
  const navigate = useNavigate()
  const { TextArea } = Input
  const [form] = Form.useForm()
  const { role } = useSelector((state) => state.login)
  const { error, response, loading } = useSelector((state) => state.requests)
  const dispatch = useDispatch()
  const updateReq = useCallback((data) => dispatch(updateRequest(data)), [dispatch])
  const params = useParams()
  const onFinish = (values) => {
    updateReq({
      id: params.id,
      values,
    })
  }

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }

  useEffect(() => {
    if (response) {
      if (response.status && 200 === response.status) {
        {
          'Admin' === role ? navigate('/admin/requests') : navigate('/client/requests')
        }
      } else {
        openNotificationWithIcon('error', response.message)
      }
    }
  }, [response])
  useEffect(() => {
    if (error) {
      openNotificationWithIcon('error', error.response.data.message)
    }
  }, [error])
  return (
    <Form
      form={form}
      id="myForm"
      layout="vertical"
      name="form_in_modal"
      style={{ width: '400px !important' }}
      onFinish={onFinish}
    >
      {contextHolder}
      <Form.Item
        label="Action:"
        name="status"
        rules={[
          {
            required: true,
            message: 'Please Choose!',
          },
        ]}
      >
        <Select
          allowClear
          placeholder="Select"
          style={{
            width: 200,
          }}
          onChange={(e) => setStatus(e)}
        >
          <Select.Option value="Approve">Approve</Select.Option>
          <Select.Option value="Reject">Reject</Select.Option>
          <Select.Option value="Change Request">Request Change</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Comment:"
        name="comment"
        rules={
          'Approve' !== status && [
            {
              required: true,
              message: 'Please Comment!',
            },
          ]
        }
      >
        <TextArea placeholder="Your comment" rows={4} />
      </Form.Item>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Submit
      </Button>
      <Link to={'/admin/requests'}>
        <Button
          htmlType="button"
          style={{
            margin: '0 8px',
          }}
        >
          Back
        </Button>
      </Link>
      <Form.Item>
        <Modal centered footer={false} open={showModal} title="Confirm" onCancel={() => setShowModal(false)}>
          <Spin spinning={loading}>
            <p>Are you sure for this action?</p>
            <Form.Item>
              <Button form="myForm" key="submit" htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Spin>
        </Modal>
      </Form.Item>
    </Form>
  )
}
export default RequestAction
