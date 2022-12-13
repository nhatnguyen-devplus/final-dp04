import DayOffAction from '@app/components/DetailsAction/DayOffAction'
import RequestAction from '@app/components/DetailsAction/RequestAction'
import { Row, Col, Typography, Space } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'
const DetailsRequestLeftSide = ({ details, action }) => {
  const { role } = useSelector((state) => state.login)
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
        return <>{'Admin' === role && <RequestAction />}</>
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
              <Text strong>From:</Text> {moment(details.logofffrom).format('YYYY-MM-DD')}
            </Text>
            <Text>
              <Text strong>Name:</Text> {details.user && details.user.name}
            </Text>
            <Text>
              <Text strong>Reason:</Text> {details.reason}
            </Text>
            <Text>
              <Text strong>Status:</Text>
              <Text className={switchColor(details.status)}> {details.status}</Text>
            </Text>
          </Space>
        </Col>
        <Col span={10}>
          <Space direction="vertical">
            <Text>
              <Text strong>To:</Text> {moment(details.logoffto).format('YYYY-MM-DD')}
            </Text>
            <Text>
              <Text strong>Quantity:</Text> {details.dayoff}
            </Text>
          </Space>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col span={20}>
          <Space direction="vertical">{switchAction(action)}</Space>
        </Col>
      </Row>
    </Col>
  )
}
export default DetailsRequestLeftSide
