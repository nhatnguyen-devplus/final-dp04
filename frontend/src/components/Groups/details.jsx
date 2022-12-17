import ViewHeader from '@app/components/ViewHeader'
import { getGroupById, updateGroup } from '@app/redux/groups/actions'
import { getAllUsers } from '@app/redux/members/actions'
import { Card, Row, Col, Button, Form, Input, Select, notification } from 'antd'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

const DetailsGroups = () => {
  const navigate = useNavigate()
  const { role } = useSelector((state) => state.login)
  const members = useSelector((state) => state.members.data)
  const dataGroup = useSelector((state) => state.groups.data)
  const { loading, error, response } = useSelector((state) => state.groups)
  const dispatch = useDispatch()
  const getGroup = useCallback((id) => dispatch(getGroupById(id)), [dispatch])
  const update = useCallback((data) => dispatch(updateGroup(data)), [dispatch])
  const getAllMembers = useCallback(() => dispatch(getAllUsers()), [dispatch])

  const params = useParams()

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }

  useEffect(() => {
    getGroup(params.id)
    getAllMembers()
  }, [])

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

  const breadcrumbs = {
    data: [
      {
        title: 'Groups ',
        path: '/admin/groups',
      },
      {
        title: 'Details ',
      },
    ],
    spread: '/',
  }
  const convertId = (input) => input.map((item) => item.value)
  const onFinish = (values) => {
    const masters = values.masters[0].value ? convertId(values.masters) : values.masters
    const staffs = values.members[0].value ? convertId(values.members) : values.members
    update({
      id: params.id,
      data: {
        name: values.name,
        masters,
        staffs,
      },
    })
  }

  const convertData = (data) =>
    data &&
    data.map((item) => ({
      value: item._id,
      label: item.name,
    }))
  const options = members && members.data ? members.data : []
  const mastersData = convertData(dataGroup.masters)
  const membersData = convertData(dataGroup.staffs)
  const filter = (input, option) =>
    0 <= option.props.children.toLowerCase().indexOf(input.toLowerCase()) ||
    0 <= option.props.value.toLowerCase().indexOf(input.toLowerCase())

  return (
    <>
      {!loading && (
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
              title="You can change data on this form"
            >
              <Row>
                <Col span={12}>
                  <Form
                    initialValues={{ name: dataGroup.name, masters: mastersData, members: membersData }}
                    layout={'vertical'}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="Name Group"
                      name={'name'}
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
                      name={'masters'}
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
                      name={'members'}
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
                    {'Admin' === role && (
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
                    )}
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
export default DetailsGroups
