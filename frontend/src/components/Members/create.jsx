import { Card, Row, Col, Button, Form, Input, Radio } from 'antd'
import { useState } from 'react'
import ViewHeader from '@app/components/ViewHeader'
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}
const CreateMember = () => {
  const breadcrumbs = {
    data: [
      {
        title: 'Members ',
        path: '/admin/members',
      },
      {
        title: 'Details '
      },
    ],
    spread: '/',
  }
  const { TextArea } = Input
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  return (
    <>
      <ViewHeader breadcrumbs={breadcrumbs} />
      <div className="site-card-border-less-wrapper">
        <Card
          title="Create Member"
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
                  label="Member's role"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose role!',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={'Staff'}>Staff</Radio>
                    <Radio value={'Manager'}>WFH</Radio>
                    <Radio value={'Hr'}>HR</Radio>
                    <Radio value={'Admin'}>Admin</Radio>
                  </Radio.Group>
                </Form.Item>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name={['firstname']}
                      label="First Name"
                      rules={[
                        {
                          required: true,
                          message: 'Please type first name!',
                        },
                      ]}
                    >
                      <Input style={{ width: '90%' }} placeholder={'First Name'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={['lastname']}
                      label="Last Name"
                      rules={[
                        {
                          required: true,
                          message: 'Please type last name!',
                        },
                      ]}
                    >
                      <Input placeholder={'Last Name'} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name={['email']}
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                    },
                  ]}
                >
                  <Input placeholder={'Email'} />
                </Form.Item>
                <Form.Item
                  name={['phone']}
                  label="Phone"
                  rules={[
                    {
                      min: 10,
                      max: 11,
                    },
                  ]}
                >
                  <Input type="number" placeholder={'Phone number'} />
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
export default CreateMember
