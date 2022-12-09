import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import './ViewHeader.scss'
const ViewHeader = ({ breadcrumbs }) => (
  <Row align="middle" className="view-header" justify="space-between">
    <Col md={8} style={{ display: 'flex' }}>
      <h4>
        {breadcrumbs.data &&
          breadcrumbs.data.map((item, index) => (
            <span key={index}>
              {0 === index ? '' : <>{breadcrumbs.spread} </>}
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
        <Tooltip placement="top" title="Ant User">
          <Avatar
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#87d068',
            }}
          />
        </Tooltip>
        <Avatar
          icon={<AntDesignOutlined />}
          style={{
            backgroundColor: '#1890ff',
          }}
        />
      </Avatar.Group>
    </Col>
  </Row>
)
export default ViewHeader
