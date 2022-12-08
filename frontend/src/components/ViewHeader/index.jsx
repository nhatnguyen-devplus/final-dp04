import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import './ViewHeader.scss'
const ViewHeader = ({ breadcrumbs }) => {
  return (
    <Row justify="space-between" align="middle" className="view-header">
      <Col md={8} style={{ display: 'flex' }}>
        <h4>
          {breadcrumbs.data &&
            breadcrumbs.data.map((item, index) => (
              <span key={index}>
                {index === 0 ? '' : <>{breadcrumbs.spread} </>}
                {item.path ? <Link to={item.path}>{item.title}</Link> : <>{item.title}</>}
              </span>
            ))}
        </h4>
      </Col>
      <Col md={3}>
        <Avatar.Group
          maxCount={2}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
          size={'small'}
        >
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Avatar
            style={{
              backgroundColor: '#f56a00',
            }}
          >
            K
          </Avatar>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{
                backgroundColor: '#87d068',
              }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{
              backgroundColor: '#1890ff',
            }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
      </Col>
    </Row>
  )
}
export default ViewHeader
