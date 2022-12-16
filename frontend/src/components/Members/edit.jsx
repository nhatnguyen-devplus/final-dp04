/* eslint-disable no-unused-vars */
import ViewHeader from '@app/components/ViewHeader'
import { updateUser, getUserById } from '@app/redux/members/actions'
import { Card, Row, Col, Button, Form, Input, notification, Select } from 'antd'
import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}
const EditMember = () => {
  const navigate = useNavigate()
  const breadcrumbs = {
    data: [
      {
        title: 'Members ',
        path: '/admin/members',
      },
      {
        title: 'Edit ',
      },
    ],
    spread: '/',
  }
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
  const details = useSelector((state) => state.members.dataById)
  const {response, error} = useSelector((state) => state.members)
  const dispatch = useDispatch()
  const params = useParams()
  const getDetails = useCallback((id) => dispatch(getUserById(id)), [dispatch])
  const update = useCallback((data) => dispatch(updateUser(data)), [dispatch])
  
  useEffect(() => {
    getDetails(params.id)
  }, [])

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

  const onFinish = (values) => {
    const name = `${values.firstName} ${values.lastName}`
    values.name = name
    const { firstName, lastName, _id, ...dataUpdate } = values

    update({
      _id: values._id,
      data: dataUpdate,
    })
  }
  const first = (fullName) => fullName.split(' ').slice(0, 1).join(' ')
  const last = (fullName) => fullName.substring(fullName.split(' ')[0].length).trim()

  return (
    <>
      {details && (
        <>
          <ViewHeader breadcrumbs={breadcrumbs} />
          {contextHolder}
          <div className="site-card-border-less-wrapper">
            <Card
              bordered={true}
              className="card-boxshadow"
              style={{
                width: '100%',
              }}
              title="Edit their details"
            >
              <Row>
                <Col span={8}>
                  <Form
                    initialValues={{
                      // password: 'password',
                      firstName: first(details.name),
                      lastName: last(details.name),
                      email: details.email,
                      phone: details.phone,
                      // role: details.role,
                      _id: details._id,
                    }}
                    layout={'vertical'}
                    validateMessages={validateMessages}
                    onFinish={onFinish}
                  >
                    <Form.Item name={['_id']} style={{ display: 'none' }}></Form.Item>
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
                    {/* <Form.Item
                      label="Role"
                      name={['role']}
                      rules={[
                        {
                          required: true,
                          message: 'Please choose role!',
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option values="Staff">Staff</Select.Option>
                        <Select.Option values="Admin">Admin</Select.Option>
                      </Select>
                    </Form.Item> */}
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
      )}
    </>
  )
}
export default EditMember
