import { ArrowRightOutlined } from '@ant-design/icons'
import { Timeline, Row, Col, Typography } from 'antd'
import '@app/components/Histories/Histories.scss'
const Histories = () => {
  const { Title, Text } = Typography
  return (
    <Col className="histories" span={12}>
      <Timeline>
        <Timeline.Item>
          <Title level={5}>Request</Title>
          <Text>Hieu Nguyễn Request</Text>
          <br></br>
          <br></br>
          <Text>From: 20-08-2022</Text>
          <br></br>
          <Text>To: 20-10-2022</Text>
          <br></br>
          <Text>Time: All Day</Text>
          <br></br>
          <Text>Quantity: 2</Text>
          <br></br>
          <Text>Reason: Date with girlfriend </Text>
        </Timeline.Item>
        <Timeline.Item>
          <Title level={5}>Approved</Title>
          <Text>Nhật Nguyễn Approved</Text>
          <br></br>
          <Text>Huy Nguyen Approved</Text>
        </Timeline.Item>
        <Timeline.Item>
          <Title level={5}>Request change</Title>
          <Text>Khoa Nguyễn Request for change : Need More Details</Text>
          <br></br>
          <Text>Huy Nguyen Approved</Text>
        </Timeline.Item>
        <Timeline.Item>
          <Title level={5}>Revert Request</Title>
          <Text>Hieu Nguyen updated Request </Text>
          <br></br>
          <br></br>
          <Row>
            <Col span={10}>
              <Text>From: 20-08-2022</Text>
              <br></br>
              <Text>To: 20-10-2022</Text>
              <br></br>
              <Text>Time: All Day</Text>
              <br></br>
              <Text>Quantity: 2</Text>
              <br></br>
              <Text>Reason: Date with girlfriends </Text>
            </Col>
            <Col span={2}>
              <br></br>
              <br></br>
              <ArrowRightOutlined />
            </Col>
            <Col span={10}>
              <Text>From: 20-08-2022</Text>
              <br></br>
              <Text>To: 21-10-2022</Text>
              <br></br>
              <Text>Time: All Day</Text>
              <br></br>
              <Text>Quantity: 3</Text>
              <br></br>
              <Text>Reason: Date with girlfriends </Text>
            </Col>
          </Row>
        </Timeline.Item>
        <Timeline.Item>
          <Title level={5}>Approved</Title>
          <Text>Nhật Nguyễn Approved</Text>
          <br></br>
          <Text>Huy Nguyen Approved</Text>
        </Timeline.Item>
      </Timeline>
    </Col>
  )
}
export default Histories
