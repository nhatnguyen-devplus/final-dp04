import ViewHeader from '@app/components/ViewHeader'
import { getRequestById, updateRequest } from '@app/redux/requests/actions'
import { Card, Row, Col, Button, Form, Input, InputNumber, Radio, DatePicker, Select, notification } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

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

const ChangeRequest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const { data, response, error } = useSelector((state) => state.requests)
  const getOneRequest = useCallback((id) => dispatch(getRequestById(id)), [dispatch])
  const update = useCallback((id) => dispatch(updateRequest(id)), [dispatch])
  const { TextArea } = Input
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }

  useEffect(() => {
    getOneRequest(params.id)
  }, [])

  useEffect(() => {
    if (null !== response) {
      if (response.status && 200 === response.status) {
        navigate('/client/requests')
      } else {
        openNotificationWithIcon('error', response.message)
      }
    }
  }, [response])

  useEffect(() => {
    if (null !== error) {
      openNotificationWithIcon('error', 'Error creating log off failed')
    }
  }, [error])

  const onFinish = (values) => {
    update({
      id: params.id,
      values: {
        contentlog: values.type,
        logofffrom: values.from.format('YYYY-MM-DD'),
        logoffto: values.to.format('YYYY-MM-DD'),
        quantity: values.quantity,
        status: 'Update',
        reason: values.reason,
      },
    })
  }

  const breadcrumbs = {
    data: [
      {
        title: 'Requests ',
        path: '/client/requests',
      },
      {
        title: 'Change ',
      },
    ],
    spread: '/',
  }

  const dateFormat = 'YYYY/MM/DD'

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
          title="Change request form"
        >
          {data && data._id && (
            <Row>
              <Col span={8}>
                <Form
                  form={form}
                  initialValues={{
                    type: data.contentlog,
                    from: dayjs(moment(data.logofffrom).format(dateFormat)),
                    to: dayjs(moment(data.logoffto).format(dateFormat)),
                    quantity: data.quantity,
                    reason: data.reason,
                    time: 'Morning',
                  }}
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
                      <Radio value="Off">Off</Radio>
                      <Radio value="WFH">WFH</Radio>
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
                        <DatePicker format={dateFormat} />
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
                        <DatePicker format={dateFormat} />
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
          )}
        </Card>
      </div>
    </>
  )
}
export default ChangeRequest
