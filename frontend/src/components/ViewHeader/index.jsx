import { Row, Col } from 'antd'
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
  </Row>
)
export default ViewHeader
