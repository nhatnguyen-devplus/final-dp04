import { Card, Row, Col, Button, Form, Input, InputNumber, Radio, DatePicker, Select } from 'antd'
import ViewHeader from '@app/components/ViewHeader'
import { useState } from 'react'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

/* eslint-disable no-template-curly-in-string */
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
  const onFinish = (values) => {}
  const breadcrumbs = {
    data: [
      {
        title: 'Log Off ',
        path: '/admin/logoff',
      },
    ],
    spread: '/',
  }
  return (
    <>
      <ViewHeader breadcrumbs={breadcrumbs} />
      <div className="site-card-border-less-wrapper">
        <Card
          title="Log Off From"
          bordered={true}
          style={{
            width: '100%',
          }}
          className="card-boxshadow"
        >
          <Row>
            <Col span={8}>
              <Form layout={'vertical'} onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                  name={['type']}
                  label="Type of Log off"
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
                      name={'from'}
                      label="From"
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
                      name={'to'}
                      label="To"
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
                      name={['quantity']}
                      label="Quantity"
                      rules={[
                        {
                          required: true,
                          type: 'number',
                          message: 'Please type number!',
                        },
                      ]}
                    >
                      <InputNumber style={{ width: '80%' }} placeholder={'Quantity'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="time"
                      label="Time"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                        style={{ width: '80%' }}
                      >
                        <Option value="Morning">Morning</Option>
                        <Option value="Afternoon">Afternoon</Option>
                        <Option value="AllDay">All Day</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name={['reason']}
                  label="Reason"
                  rules={[
                    {
                      required: true,
                      message: 'Please type your reason!',
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Type your reason" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
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
