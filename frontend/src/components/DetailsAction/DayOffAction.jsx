import { UndoOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography, Modal } from 'antd'
import { useState } from 'react'

const DayOffAction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { Title, Text } = Typography
  const { TextArea } = Input
  const [form] = Form.useForm()
  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  return (
    <>
      <Text strong>Action:</Text>
      <br></br>
      <br></br>
      <Button type="primary" onClick={showModal} icon=<UndoOutlined />>
        Revert
      </Button>
      <Modal title="Reason for revert:" open={isModalOpen} onCancel={showModal} footer={''}>
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="reason"
            rules={[
              {
                required: true,
                message: 'Please type your reason!',
              },
            ]}
          >
            <TextArea rows={4} placeholder="Your reason" />
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
