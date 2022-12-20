/* eslint-disable no-unused-vars */
import { BrMembersCreateAdmin, BrMembersCreateClient } from '@app/components/Breadcrumbs/data'
import ViewHeader from '@app/components/ViewHeader'
import { createUser } from '@app/redux/members/actions'
import { Card, Row, Col, Button, Form, Input, notification } from 'antd'
import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [form] = Form.useForm()
  //Notification
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }
  //Call API
  const dispatch = useDispatch()
  const { role } = useSelector((state) => state.login)
  const { response, error } = useSelector((state) => state.members)
  const create = useCallback((values) => dispatch(createUser(values)), [dispatch])
  const onFinish = (values) => {
    const name = `${values.firstName} ${values.lastName}`
    values.name = name
    const { firstName, lastName, ...data } = values
    create(data)
  }

  useEffect(() => {
    if (response) {
      if (response.status && 200 === response.status) {
        openNotificationWithIcon('success', response.message)
        navigate('/admin/members')
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
      <ViewHeader breadcrumbs={'Admin' === role ? BrMembersCreateAdmin : BrMembersCreateClient} />
      {contextHolder}
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
              <Form
                form={form}
                initialValues={{ password: 'password' }}
                layout={'vertical'}
                validateMessages={validateMessages}
                onFinish={onFinish}
              >
                {/* <Form.Item
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
                    <Radio value={'Manager'}>Master</Radio>
                    <Radio value={'Hr'}>HR</Radio>
                    <Radio value={'Admin'}>Admin</Radio>
                  </Radio.Group>
                </Form.Item> */}
                <Form.Item name={['password']} style={{ display: 'none' }}></Form.Item>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      name={['firstName']}
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
                      name={['lastName']}
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
                      required: true,
                      message: 'Please type phone numbers!',
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
