import ViewHeader from '@app/components/ViewHeader'
import { Card, Row, Col, Image, Typography, Space } from 'antd'
import { useParams } from 'react-router-dom'
import '@app/components/Members/Member.scss'
import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserById } from '@app/redux/members/actions'

const DetailsMember = () => {
  const members = useSelector((state) => state.members.dataById)
  const dispatch = useDispatch()
  const getAllMembers = useCallback((id) => dispatch(getUserById(id)), [dispatch])

  useEffect(() => {
    getAllMembers(params.id)
  }, [])
  const params = useParams()

  const details = members?.data?.find((item) => item._id === params.id)
  const { Text } = Typography
  const breadcrumbs = {
    data: [
      {
        title: 'Members ',
        path: '/admin/members',
      },
      {
        title: 'Details ',
      },
    ],
    spread: '/',
  }

  const first = (fullName) => {
    const firstName = fullName.split(' ').slice(0, -2).join(' ')
    return firstName
  }
  const last = (fullName) => {
    const lastName = fullName.split(' ').slice(0, -2).join(' ')
    return lastName
  }
  const firstName = details ? first(details?.name) : ''
  const lastName = details ? last(details?.name) : ''
  return (
    <>
      {details && (
        <>
          <ViewHeader breadcrumbs={breadcrumbs} />
          <div className="site-card-border-less-wrapper">
            <Card
              bordered={true}
              className="card-boxshadow"
              style={{
                width: '100%',
              }}
              title="Member Details"
            >
              <Row>
                <Col span={8}>
                  <Space className="datails-member" direction="vertical">
                    {details.image && <Image src={details?.image} width={200} />}
                    <Text>
                      <Text strong>First Name:</Text> {firstName}
                    </Text>
                    <Text>
                      <Text strong>Last Name:</Text> {lastName}
                    </Text>
                    <Text>
                      <Text strong>Email:</Text> {details.email}
                    </Text>
                    <Text>
                      <Text strong>Group:</Text> {details.group}
                    </Text>
                    <Text>
                      <Text strong>Phone:</Text> {details.phone}
                    </Text>
                    <Text>
                      <Text strong>Role:</Text> {details.role}
                    </Text>
                    <Text>
                      <Text strong>Create At:</Text> {details.created_at}
                    </Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          </div>
        </>
      )}
    </>
  )
}
export default DetailsMember
