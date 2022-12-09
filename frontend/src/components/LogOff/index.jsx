import ViewHeader from '@app/components/ViewHeader'
import { Card, Row, Col, Button, Form, Input, InputNumber, Radio, DatePicker, Select } from 'antd'

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

const LogOffForm = () => {
  const { TextArea } = Input
  const onFinish = (values) => {
    console.log(values)
  }
  const breadcrumbs = {
    data: [
      {
        title: 'Log Off ',
        path: '/admin/logoff',
      },
    ],
    spread: '/',
  }
  const initialValues = {
    type: 1,
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
          title="Log Off From"
        >
          <Row>
            <Col span={8}>
              <Form
                initialValues={initialValues}
                layout={'vertical'}
                validateMessages={validateMessages}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Type of Log off"
                  name={['type']}
                  rules={[
                    {
                      required: true,
                      message: 'Please choose your type!',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={1}>Off</Radio>
                    <Radio value={2}>WFH</Radio>
                  </Radio.Group>
                </Form.Item>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="From"
                      name={'from'}
                      rules={[
                        {
                          required: true,
                          message: 'Please pick from time!',
                        },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="To"
                      name={'to'}
                      rules={[
                        {
                          required: true,
                          message: 'Please pick to time!',
                        },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Quantity"
                      name={['quantity']}
                      rules={[
                        {
                          required: true,
                          type: 'number',
                          message: 'Please type number!',
                        },
                      ]}
                    >
                      <InputNumber placeholder={'Quantity'} style={{ width: '80%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Time"
                      name="time"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        allowClear
                        placeholder="Select a option and change input text above"
                        style={{ width: '80%' }}
                      >
                        <Select.Option value="Morning">Morning</Select.Option>
                        <Select.Option value="Afternoon">Afternoon</Select.Option>
                        <Select.Option value="AllDay">All Day</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Reason"
                  name={['reason']}
                  rules={[
                    {
                      required: true,
                      message: 'Please type your reason!',
                    },
                  ]}
                >
                  <TextArea placeholder="Type your reason" rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  )
}
export default LogOffForm
