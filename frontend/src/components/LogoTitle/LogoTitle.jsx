import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import { Link } from 'react-router-dom'
import './LogoTitle.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
const items = [
  {
    label: <Link to="https://www.antgroup.com">ST United</Link>,
    key: '0',
  },
  {
    label: <Link to="https://www.aliyun.com">DevPlus</Link>,
    key: '1',
  },
]
const LogoTitle = (props) => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <Link onClick={(e) => e.preventDefault()}>
      <Space className="logo-title">
        {props.collapsed ? (
          <h2>
            <FontAwesomeIcon icon={faPowerOff} />
          </h2>
        ) : (
          <>
            <h2>ST United</h2>
            <DownOutlined />
          </>
        )}
      </Space>
    </Link>
  </Dropdown>
)
export default LogoTitle
