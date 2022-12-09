import { Button, Form, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
const RequestAction = () => {
  const { TextArea } = Input
  const [form] = Form.useForm()
  return (
    <Form form={form} layout="vertical" name="form_in_modal" style={{ width: '400px !important' }}>
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
          <Select.Option value="0">Pending</Select.Option>
          <Select.Option value="1">Approve</Select.Option>
          <Select.Option value="2">Reject</Select.Option>
          <Select.Option value="2">Request Change</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Description:" name="comment">
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
