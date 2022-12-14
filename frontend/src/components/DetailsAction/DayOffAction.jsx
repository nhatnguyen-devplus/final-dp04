import { UndoOutlined } from '@ant-design/icons'
import { updateRequest } from '@app/redux/requests/actions'
import { Button, Form, Input, Typography, Modal, notification, Tooltip } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const DayOffAction = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { Text } = Typography
  const { TextArea } = Input
  const dispatch = useDispatch()
  const { error, response } = useSelector((state) => state.requests)
  const { role } = useSelector((state) => state.login)
  const updateReq = useCallback((data) => dispatch(updateRequest(data)), [dispatch])
  const [form] = Form.useForm()
  const params = useParams()
  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }
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
          'Admin' === role ? navigate('/admin/daysoff') : navigate('/client/daysoff')
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
    <>
      {contextHolder}

      <Text strong>Action:</Text>
      <br></br>
      <br></br>
      <Tooltip placement="top" title="Revert">
        <Button icon={<UndoOutlined />} type="primary" onClick={showModal}></Button>
      </Tooltip>

      <Modal footer={''} open={isModalOpen} title="Reason for revert:" onCancel={showModal}>
        <Form
          form={form}
          initialValues={{ status: 'Cancel' }}
          layout="vertical"
          name="form_in_modal"
          onFinish={onFinish}
        >
          <Form.Item name="status" style={{ display: 'none' }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="comment"
            rules={[
              {
                required: true,
                message: 'Please type your reason!',
              },
            ]}
          >
            <TextArea placeholder="Your reason" rows={4} />
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
export default DayOffAction
