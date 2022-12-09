import DayOffAction from '@app/components/DetailsAction/DayOffAction'
import RequestAction from '@app/components/DetailsAction/RequestAction'
import { Row, Col, Typography, Space } from 'antd'
const DetailsRequestLeftSide = ({ details, action }) => {
  const { Text } = Typography
  const switchColor = (status) => {
    switch (status) {
      case '0':
        return 's-pending'
      case '1':
        return 's-approve'
      case '2':
        return 's-reject'
      case '3':
        return 's-waitupdate'
      case '4':
        return 's-cancel'
      default:
        return null
    }
  }
  const switchAction = (action) => {
    switch (action) {
      case 'request':
        return <RequestAction />
      case 'dayoff':
        return <DayOffAction />
      default:
        ''
    }
  }
  return (
    <Col span={12}>
      <Row>
        <Col span={10}>
          <Space direction="vertical">
            <Text>
              <Text strong>Name:</Text> {details.user}
            </Text>
            <Text>
              <Text strong>Email:</Text> {details.mail}
            </Text>
            <Text>
              <Text strong>Day Off:</Text> {details.dayoff}
            </Text>
            <Text>
              <Text strong>Time:</Text> {details.time}
            </Text>
          </Space>
        </Col>
        <Col span={10}>
          <Space direction="vertical">
            <Text>
              <Text strong>Group:</Text> {details.group}
            </Text>
            <Text>
              <Text strong>Phone:</Text> {details.phone}
            </Text>
            <Text>
              <Text strong>Quantity:</Text> {details.qty}
            </Text>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={20}>
          <Space direction="vertical">
            <Text>
              <Text strong>Reason:</Text> {details.reason}
            </Text>
            <Text>
              <Text strong>Status:</Text>
              <Text className={switchColor(details.status)}> {details.status}</Text>
            </Text>
            {switchAction(action)}
          </Space>
        </Col>
      </Row>
    </Col>
  )
}
export default DetailsRequestLeftSide
