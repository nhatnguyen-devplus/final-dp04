import { ArrowRightOutlined } from '@ant-design/icons'
import { Timeline, Row, Col, Typography } from 'antd'
import '@app/components/Histories/Histories.scss'
import { getHistories } from '@app/redux/histories/action'
import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
const Histories = () => {
  const { Title, Text } = Typography
  const params = useParams()
  const histories = useSelector((state) => state.histories)
  const dispatch = useDispatch()
  const getHis = useCallback((id) => dispatch(getHistories(id), [dispatch]))

  useEffect(() => {
    getHis(params.id)
  }, [params.id])

  const switchTimeline = (item, index) => {
    switch (item.typelog) {
      case 'CREATE':
        return (
          <Timeline.Item key={index}>
            <Title level={5}>Request</Title>
            <Text strong>{item?.user?.name}</Text> <Text>requested</Text>
            <br></br>
            <br></br>
            <Text strong>From:</Text> <Text>{moment(item?.logofffrom).format('YYYY-MM-DD')}</Text>
            <br></br>
            <Text strong>To:</Text> <Text>{moment(item?.logoffto).format('YYYY-MM-DD')}</Text>
            <br></br>
            <Text strong>Type:</Text> <Text>{item?.contentlog}</Text>
            <br></br>
            <Text strong>Quantity:</Text> <Text>{item?.quantity}</Text>
            <br></br>
            <Text strong>Reason:</Text> <Text>{item?.reason}</Text>
          </Timeline.Item>
        )
      case 'APPROVE':
        return (
          <Timeline.Item key={index}>
            <Title level={5}>Approved</Title>
            <Text strong> {item?.user?.name}</Text> <Text>approved</Text>
            {item.comment && (
              <>
                <br></br>
                <Text>Comment: {item.comment}</Text>
              </>
            )}
          </Timeline.Item>
        )
      case 'CHANGE_REQUEST':
        return (
          <Timeline.Item key={index}>
            <Title level={5}>Requests Change</Title>
            <Text strong> {item?.user?.name}</Text> <Text>requested change</Text>
            {item.comment && (
              <>
                <br></br>
                <Text>Comment: {item.comment}</Text>
              </>
            )}
          </Timeline.Item>
        )
      case 'UPDATE':
        return (
          <Timeline.Item key={index}>
            <Title level={5}>Change Request</Title>
            <Text strong>{item?.user?.name}</Text> <Text>Changed Request</Text>
            <br></br>
            <br></br>
            <Row>
              <Col span={10}>
                <Text strong>From:</Text>{' '}
                <Text>{moment(histories.data[index - 1]?.logofffrom).format('YYYY-MM-DD')}</Text>
                <br></br>
                <Text strong>To:</Text> <Text>{moment(histories?.data[index - 1]?.logoffto).format('YYYY-MM-DD')}</Text>
                <br></br>
                <Text strong>Type:</Text> <Text>{histories?.data[index - 1]?.contentlog}</Text>
                <br></br>
                <Text strong>Quantity:</Text> <Text>{histories?.data[index - 1]?.quantity}</Text>
                <br></br>
                <Text strong>Reason:</Text> <Text>{histories?.data[index - 1]?.reason}</Text>
              </Col>
              <Col span={2}>
                <br></br>
                <br></br>
                <ArrowRightOutlined />
              </Col>
              <Col span={10}>
                <Text strong>From:</Text> <Text>{moment(item?.logofffrom).format('YYYY-MM-DD')}</Text>
                <br></br>
                <Text strong>To:</Text> <Text>{moment(item?.logoffto).format('YYYY-MM-DD')}</Text>
                <br></br>
                <Text strong>Type:</Text> <Text>{item?.contentlog}</Text>
                <br></br>
                <Text strong>Quantity:</Text> <Text>{item?.quantity}</Text>
                <br></br>
                <Text strong>Reason:</Text> <Text>{item?.reason}</Text>
              </Col>
            </Row>
          </Timeline.Item>
        )
      case 'REJECT':
        return (
          <>
            <Timeline.Item key={index}>
              <Title level={5}>Rejected</Title>
              <Text strong> {item?.user?.name}</Text> <Text>rejected</Text>
              {item.comment && (
                <>
                  <br></br>
                  <Text>Comment: {item.comment}</Text>
                </>
              )}
            </Timeline.Item>
            <Timeline.Item key={index}>
              <Title level={5}>Day Off Cancel</Title>
              <Text strong>Day off has been canceled</Text>
            </Timeline.Item>
          </>
        )

      case 'CANCEL':
        return (
          <>
            <Timeline.Item key={index}>
              <Title level={5}>Cancel</Title>
              <Text strong> {item?.user?.name}</Text> <Text>canceled</Text>
              {item.comment && (
                <>
                  <br></br>
                  <Text>Comment: {item.comment}</Text>
                </>
              )}
            </Timeline.Item>
            <Timeline.Item key={index}>
              <Title level={5}>Day Off Cancel</Title>
              <Text strong>Day off has been canceled</Text>
            </Timeline.Item>
          </>
        )
      default:
    }
  }
  return (
    <Col className="histories" span={12}>
      {histories.data && <Timeline>{histories.data?.map((item, index) => switchTimeline(item, index))}</Timeline>}
    </Col>
  )
}
export default Histories
