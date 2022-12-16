import { updateRequest } from '@app/redux/requests/actions'
import { Button, Form, Input, notification, Select } from 'antd'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

const RequestAction = () => {
  const navigate = useNavigate()
  const { TextArea } = Input
  const [form] = Form.useForm()
  const { role } = useSelector((state) => state.login)
  const { error, response } = useSelector((state) => state.requests)
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
    <Form form={form} layout="vertical" name="form_in_modal" style={{ width: '400px !important' }} onFinish={onFinish}>
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
        >
          <Select.Option value="Approve">Approve</Select.Option>
          <Select.Option value="Reject">Reject</Select.Option>
          <Select.Option value="Request Change">Request Change</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Description:" name="reason">
        <TextArea placeholder="Your comment" rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
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
      </Form.Item>
    </Form>
  )
}
export default RequestAction
