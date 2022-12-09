import { data } from '@app/components/Requests/Requests.data'
import { Card, Row, Col, Button, Form, Input, Select, Typography, Space } from 'antd'
import { Link, useParams } from 'react-router-dom'
import '@app/components/Requests/Requests.scss'
import ViewHeader from '@app/components/ViewHeader'
import Histories from '@app/components/Histories'

const DetailsRequest = () => {
  const { TextArea } = Input
  const { Text } = Typography
  const params = useParams()
  const details = data.find((item) => item.key === params.id)
  const [form] = Form.useForm()
  const breadcrumbs = {
    data: [
      {
        title: 'Requests ',
        path: '/admin/requests',
      },
      {
        title: 'Details ',
      },
    ],
    spread: '/',
  }
  const switchColor = (status) => {
    switch (status) {
      case '0':
        return 's-pending'
      case '1':
        return 's-approve'
      case '2':
        return 's-reject'
      case '3':
        return 's-waitupdate'
      case '4':
        return 's-cancel'
      default:
        return null
    }
  }
  return (
    <>
      <ViewHeader breadcrumbs={breadcrumbs} />
      <div className="site-card-border-less-wrapper">
        <Card
          bordered={true}
          className="card-boxshadow"
          style={{
            width: '100%',
          }}
          title="Log Off Details"
        >
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <Space direction="vertical">
                    <Text>
                      <Text strong>Name:</Text> {details.user}
                    </Text>
                    <Text>
                      <Text strong>Email:</Text> {details.mail}
                    </Text>
                    <Text>
                      <Text strong>Day Off:</Text> {details.dayoff}
                    </Text>
                    <Text>
                      <Text strong>Time:</Text> {details.time}
                    </Text>
                  </Space>
                </Col>
                <Col span={10}>
                  <Space direction="vertical">
                    <Text>
                      <Text strong>Group:</Text> {details.group}
                    </Text>
                    <Text>
                      <Text strong>Phone:</Text> {details.phone}
                    </Text>
                    <Text>
                      <Text strong>Quantity:</Text> {details.qty}
                    </Text>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={20}>
                  <Space direction="vertical">
                    <Text>
                      <Text strong>Reason:</Text> {details.reason}
                    </Text>
                    <Text>
                      <Text strong>Status:</Text>
                      <Text className={switchColor(details.status)}> {details.status}</Text>
                    </Text>
                  </Space>
                  <Form form={form} layout="vertical" name="form_in_modal">
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
                    <Form.Item label="Description:" name="description">
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
                </Col>
              </Row>
            </Col>
            <Histories />
          </Row>
        </Card>
      </div>
    </>
  )
}
export default DetailsRequest
