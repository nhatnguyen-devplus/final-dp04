import { data } from '@app/components/Members/Members.data'
import ViewHeader from '@app/components/ViewHeader'
import { Card, Row, Col, Image, Typography, Space } from 'antd'
import { useParams } from 'react-router-dom'
import '@app/components/Members/Member.scss'

const DetailsMember = () => {
  const params = useParams()
  const details = data.find((item) => item.id === params.id)
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
  const fistLast = (fullName) => {
    const name = {}
    name.firstName = fullName.split(' ').slice(0, -2).join(' ')
    name.lastName = fullName.split(' ').slice(-2).join(' ')

    return name
  }
  const name = fistLast(details.name)
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
          title="Member Details"
        >
          <Row>
            <Col span={8}>
              <Space className="datails-member" direction="vertical">
                {details.image && <Image src={details.image} width={200} />}
                <Text>
                  <Text strong>First Name:</Text> {name.firstName}
                </Text>
                <Text>
                  <Text strong>Last Name:</Text> {name.lastName}
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
  )
}
export default DetailsMember
