import ViewHeader from '@app/components/ViewHeader'
import { Card, Row, Col, Button, Form, Select } from 'antd'
import { Link } from 'react-router-dom'
import { dayOffChannel, hrChannel } from './NotiData'

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
  const onFinish = (values) => {
    console.log(values)
  }
  const convertData = (data) =>
    data.map((item) => ({
      value: item.id,
      label: item.name,
    }))
  const dayOff = convertData(dayOffChannel)
  const hr = convertData(hrChannel)
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
              <Form initialValues={{ dayoffchannel: dayOff, hrchannel: hr }} layout={'vertical'} onFinish={onFinish}>
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
                    {dayOffChannel.map((option) => (
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
                    {hrChannel.map((option) => (
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
