/* eslint-disable no-unused-vars */
import ViewHeader from '@app/components/ViewHeader'
import { Card, Row, Col, Button, Form, Input, Radio } from 'antd'
import axios from 'axios'
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
        title: 'Details ',
      },
    ],
    spread: '/',
  }
  // const { TextArea } = Input
  const onFinish = async (values) => {}
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
          title="Create Member"
        >
          <Row>
            <Col span={8}>
              <Form layout={'vertical'} validateMessages={validateMessages} onFinish={onFinish}>
                <Form.Item
                  label="Member's role"
                  name={['type']}
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
                      label="First Name"
                      name={['firstname']}
                      rules={[
                        {
                          required: true,
                          message: 'Please type first name!',
                        },
                      ]}
                    >
                      <Input placeholder={'First Name'} style={{ width: '90%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      name={['lastname']}
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
                  label="Email"
                  name={['email']}
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
                  label="Phone"
                  name={['phone']}
                  rules={[
                    {
                      min: 10,
                      max: 11,
                    },
                  ]}
                >
                  <Input placeholder={'Phone number'} type="number" />
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
export default CreateMember
