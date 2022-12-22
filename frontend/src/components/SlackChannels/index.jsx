import { BrBroadcastSlack } from '@app/components/Breadcrumbs/data'
import ViewHeader from '@app/components/ViewHeader'
import { getAllSlackChannels, getSlackChannelsDB, updateSlackChannels } from '@app/redux/slack/actions'
import { Card, Row, Col, Button, Form, Select, notification } from 'antd'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const SlackChannels = () => {
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }
  const channels = useSelector((state) => state.slack.dataAll)
  const channelsDB = useSelector((state) => state.slack.dataDB)
  const { response, error } = useSelector((state) => state.slack)
  const dispatch = useDispatch()
  const getAllChannels = useCallback(() => dispatch(getAllSlackChannels()), [dispatch])
  const getChannelsDB = useCallback(() => dispatch(getSlackChannelsDB()), [dispatch])
  const update = useCallback((data) => dispatch(updateSlackChannels(data)), [dispatch])

  useEffect(() => {
    getAllChannels()
    getChannelsDB()
  }, [])

  useEffect(() => {
    if (response) {
      if (response.status && 200 === response.status) {
        openNotificationWithIcon('success', response.message)
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

  const convertId = (input) => input.map((item) => item.value)
  const onFinish = (values) => {
    const dayoff = values.dayoffchannel[0].value ? convertId(values.dayoffchannel) : values.dayoffchannel
    const hr = values.hrchannel[0].value ? convertId(values.hrchannel) : values.hrchannel
    update({
      id: channelsDB._id,
      data: {
        dayoffchannel: dayoff.map((item) => ({
          slackId: item,
        })),
        hrchannel: hr.map((item) => ({
          slackId: item,
        })),
      },
    })
  }
  const convertData = (data) =>
    data.map((item) => ({
      value: item?.slackId,
      label: item?.name,
    }))
  const filter = (input, option) =>
    0 <= option.props.children.toLowerCase().indexOf(input.toLowerCase()) ||
    0 <= option.props.value.toLowerCase().indexOf(input.toLowerCase())

  return (
    <>
      {channelsDB && (
        <>
          <ViewHeader breadcrumbs={BrBroadcastSlack} />
          {contextHolder}
          <div className="site-card-border-less-wrapper">
            <Card
              bordered={true}
              className="card-boxshadow"
              style={{
                width: '100%',
              }}
              title="Choose slack channels to broadcast"
            >
              <Row>
                <Col span={12}>
                  <Form
                    initialValues={{
                      dayoffchannel: convertData(channelsDB?.dayoffchannel),
                      hrchannel: convertData(channelsDB?.hrchannel),
                    }}
                    layout={'vertical'}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="Day off channel"
                      name={['dayoffchannel']}
                      rules={[
                        {
                          required: true,
                          message: 'Please type or change Day off channel!',
                        },
                      ]}
                    >
                      <Select
                        filterOption={(input, option) => filter(input, option)}
                        mode="multiple"
                        placeholder="Choose day off channel"
                      >
                        {channels?.map((option) => (
                          <Select.Option key={option.id} value={option.id}>
                            {option.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="HR channel"
                      name={['hrchannel']}
                      rules={[
                        {
                          required: true,
                          message: 'Please type or change  HR channel!',
                        },
                      ]}
                    >
                      <Select
                        filterOption={(input, option) => filter(input, option)}
                        mode="multiple"
                        placeholder="Choose Channel"
                      >
                        {channels?.map((option) => (
                          <Select.Option key={option.id} value={option.id}>
                            {option.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        Submit
                      </Button>
                      <Link to={'/admin'}>
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
      )}
    </>
  )
}
export default SlackChannels
