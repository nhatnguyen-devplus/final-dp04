import { EditOutlined } from '@ant-design/icons'
import DayOffAction from '@app/components/DetailsAction/DayOffAction'
import RequestAction from '@app/components/DetailsAction/RequestAction'
import { Row, Col, Typography, Space, Tag, Tooltip, Button } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const DetailsRequestLeftSide = ({ details, action }) => {
  const { data } = useSelector((state) => state.login)
  const { Text } = Typography
  const switchColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'processing'
      case 'Change Request':
        return 'warning'
      case 'Approve':
        return 'success'
      case 'Reject':
        return 'error'
      case 'Cancel':
        return 'default'
      default:
        return null
    }
  }
  const switchAction = (action) => {
    switch (action) {
      case 'request':
        return (
          <>
            {'Pending' === details.status && !details.approval.includes(data._id) && details.user._id !== data._id && (
              <RequestAction />
            )}
            {'Change Request' === details.status && details.user._id === data._id && (
              <Link to={`/client/requests/change/${details._id}`}>
                <Tooltip placement="top" title="Change">
                  <Button style={{ background: '#ffc107' }} icon={<EditOutlined />}></Button>
                </Tooltip>
              </Link>
            )}
          </>
        )
      case 'dayoff':
        return <>{details.user && details.user._id === data._id && 'Approve' === details.status && <DayOffAction />}</>
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
              <Text strong>Name: </Text> {details.user && details.user.name}
            </Text>
            <Text>
              <Text strong>From: </Text> {moment(details.logofffrom).format('YYYY-MM-DD')}
            </Text>
            <Text>
              <Text strong>Status: </Text>
              <Tag color={switchColor(details.status)}> {details.status}</Tag>
            </Text>
            <Text>
              <Text strong>Reason:</Text> {details.reason}
            </Text>
          </Space>
        </Col>
        <Col span={10}>
          <Space direction="vertical">
            <Text>
              <Text strong>Type:</Text> {details.contentlog}
            </Text>
            <Text>
              <Text strong>To:</Text> {moment(details.logoffto).format('YYYY-MM-DD')}
            </Text>
            <Text>
              <Text strong>Quantity:</Text> {details.quantity}
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
