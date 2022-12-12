/* eslint-disable import-order-alphabetical/order */
import ViewHeader from '@app/components/ViewHeader'
import { Card, Row, Col, Image, Typography, Space, Avatar } from 'antd'
import { useParams } from 'react-router-dom'
import '@app/components/Members/Member.scss'
import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserById } from '@app/redux/members/actions'
import { UserOutlined } from '@ant-design/icons'

const DetailsMember = () => {
  const details = useSelector((state) => state.members.dataById)
  const dispatch = useDispatch()
  const params = useParams()
  const getDetails = useCallback((id) => dispatch(getUserById(id)), [dispatch])

  useEffect(() => {
    getDetails(params.id)
  }, [])

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
  const first = (fullName) => fullName.split(' ').slice(0, 1).join(' ')
  const last = (fullName) => fullName.substring(fullName.split(' ')[0].length).trim()

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
                    {details.image ? (
                      <Image src={details?.image} width={200} />
                    ) : (
                      <Avatar icon={<UserOutlined />} shape="square" size={100} />
                    )}
                    <Text>
                      <Text strong>First Name:</Text> {first(details.name)}
                    </Text>
                    <Text>
                      <Text strong>Last Name:</Text> {last(details.name)}
                    </Text>
                    <Text>
                      <Text strong>Email:</Text> {details.email}
                    </Text>
                    <Text>
                      <Text strong>Group:</Text>{' '}
                      {0 < details.groupsId.length && details.groupsId.map((group) => group.name).join(', ')}
                    </Text>
                    <Text>
                      <Text strong>Phone:</Text> {details.phone}
                    </Text>
                    <Text>
                      <Text strong>Role:</Text> {details.role}
                    </Text>
                    <Text>
                      <Text strong>Create At:</Text> {details.createdAt}
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
