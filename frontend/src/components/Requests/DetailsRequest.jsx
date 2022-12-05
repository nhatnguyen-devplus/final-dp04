import { Card, Row, Col, Button, Form, Input, Select } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { data } from '@app/components/Requests/Requests.data'
import '@app/components/Requests/Requests.scss'
import ViewHeader from '@app/components/ViewHeader'

const DetailsRequest = () => {
  const { TextArea } = Input
  const params = useParams()
  const details = data.find((item) => item.key == params.id)
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
   switch(status){
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
        <Row>
          <Col offset={0} span={24}>
            <Card
              title="Log Off Details"
              bordered={true}
              style={{
                width: '100%',
              }}
              className="card-boxshadow"
            >
              <Row>
                <Col span={8}>
                  <p>Name: {details.user}</p>
                  <p>Email: {details.mail}</p>
                  <p>Day Off: {details.dayoff}</p>
                </Col>
                <Col span={8}>
                  <p>Group: {details.group}</p>
                  <p>Phone: {details.phone}</p>
                  <p>Quantity: {details.qty}</p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <p>Reason: {details.reason}</p>
                  <p className="status-details">
                    Status:
                    <span className={switchColor(details.status)}> {details.status}</span>
                  </p>

                  <Form form={form} layout="vertical" name="form_in_modal">
                    <Form.Item
                      name="status"
                      label="Action:"
                      rules={[
                        {
                          required: true,
                          message: 'Please Choose!',
                        },
                      ]}
                    >
                      <Select
                        style={{
                          width: 200,
                        }}
                        placeholder="Select"
                        allowClear
                      >
                        <Option value="0">Pending</Option>
                        <Option value="1">Approve</Option>
                        <Option value="2">Reject</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Description:">
                      <TextArea rows={4} placeholder="Your comment" />
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
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default DetailsRequest
