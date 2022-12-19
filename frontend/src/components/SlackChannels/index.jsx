import ViewHeader from '@app/components/ViewHeader'
import { getAllSlackChannels } from '@app/redux/slack/actions'
import { Card, Row, Col, Button, Form, Select } from 'antd'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const SlackChannels = () => {
  const breadcrumbs = {
    data: [
      {
        title: 'Broadcast ',
        path: '#',
      },
      {
        title: 'Slack Channels ',
      },
    ],
    spread: '/',
  }

  const channels = useSelector((state) => state.slack.dataAll)
  const dispatch = useDispatch()
  const getAllChannels = useCallback(() => dispatch(getAllSlackChannels()), [dispatch])

  useEffect(() => {
    getAllChannels()
  }, [])

  console.log(channels)
  const onFinish = (values) => {
    console.log(values)
  }
  const convertData = (data) =>
    data.map((item) => ({
      value: item.id,
      label: item.name,
    }))
  const filter = (input, option) =>
    0 <= option.props.children.toLowerCase().indexOf(input.toLowerCase()) ||
    0 <= option.props.value.toLowerCase().indexOf(input.toLowerCase())

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
          title="Choose slack channels to broadcast"
        >
          <Row>
            <Col span={12}>
              <Form layout={'vertical'} onFinish={onFinish}>
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
  )
}
export default SlackChannels
