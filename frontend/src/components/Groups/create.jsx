import ViewHeader from '@app/components/ViewHeader'
import { postCreateGroup } from '@app/redux/groups/actions'
import { getAllUsers } from '@app/redux/members/actions'
import { Card, Row, Col, Button, Form, Input, Select, notification } from 'antd'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CreateGroup = () => {
  const navigate = useNavigate()
  const members = useSelector((state) => state.members.data)
  const { response, error } = useSelector((state) => state.groups)
  const dispatch = useDispatch()
  const createGroup = useCallback((data) => dispatch(postCreateGroup(data)), [dispatch])
  const getAllMembers = useCallback(() => dispatch(getAllUsers()), [dispatch])

  useEffect(() => {
    getAllMembers()
  }, [])

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }

  const breadcrumbs = {
    data: [
      {
        title: 'Groups ',
        path: '/admin/groups',
      },
      {
        title: 'Create ',
      },
    ],
    spread: '/',
  }

  useEffect(() => {
    if (response) {
      if (response.status && 200 === response.status) {
        navigate('/admin/groups')
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
    createGroup(values)
  }
  const filter = (input, option) =>
    0 <= option.props.children.toLowerCase().indexOf(input.toLowerCase()) ||
    0 <= option.props.value.toLowerCase().indexOf(input.toLowerCase())
  const options = members && members.data ? members.data : []
  return (
    <>
      {contextHolder}
      <ViewHeader breadcrumbs={breadcrumbs} />
      <div className="site-card-border-less-wrapper">
        <Card
          bordered={true}
          className="card-boxshadow"
          style={{
            width: '100%',
          }}
          title="Create Group Form"
        >
          <Row>
            <Col span={12}>
              <Form layout={'vertical'} onFinish={onFinish}>
                <Form.Item
                  label="Name Group"
                  name={['name']}
                  rules={[
                    {
                      required: true,
                      message: 'Please type name group!',
                    },
                  ]}
                >
                  <Input placeholder="Type name group" />
                </Form.Item>
                <Form.Item
                  label="Masters"
                  name={['masters']}
                  rules={[
                    {
                      required: true,
                      message: 'Please type master in group!',
                    },
                  ]}
                >
                  <Select
                    filterOption={(input, option) => filter(input, option)}
                    mode="multiple"
                    placeholder="Choose members"
                  >
                    {options.map((option) => (
                      <Select.Option key={option._id} value={option._id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Members"
                  name={['staffs']}
                  rules={[
                    {
                      required: true,
                      message: 'Please type members in group!',
                    },
                  ]}
                >
                  <Select
                    filterOption={(input, option) => filter(input, option)}
                    mode="multiple"
                    placeholder="Choose members"
                  >
                    {options.map((option) => (
                      <Select.Option key={option._id} value={option._id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Submit
                  </Button>
                  <Link to={'/admin/groups'}>
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
      </div>
    </>
  )
}
export default CreateGroup
