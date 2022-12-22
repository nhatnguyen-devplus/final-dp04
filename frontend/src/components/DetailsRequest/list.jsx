import { EyeOutlined } from '@ant-design/icons'
import { Button, Table, Tag } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import '@app/components/Requests/Requests.scss'

const ListRequests = ({ listdata }) => {
  const formatDate = (date) => moment(date).format('YYYY-MM-DD')
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
  const columns = [
    {
      title: '#',
      render: (text, record, index) => index + 1,
      width: '2%',
    },
    {
      title: 'Day Off',
      dataIndex: 'logofffrom',
      width: '16%',
      render: (text, record) => (
        <p>{text === record.logoffto ? formatDate(text) : `${formatDate(text)} - ${formatDate(record.logoffto)}`}</p>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'contentlog',
      width: '3%',
    },
    ,
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '3%',
    },
    {
      title: 'Name',
      dataIndex: 'user',
      render: (text) => <Link to="">{text.name}</Link>,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      render: (text) => <p className="line-clamp-2">{text}</p>,
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      render: (text) => (
        <div className="status">
          <Tag color={switchColor(text)}>{text}</Tag>
        </div>
      ),
    },
    ,
    {
      title: 'Create At',
      dataIndex: 'created_at',
      width: '10%',
      render: (text) => <p>{moment(text).format('YYYY-MM-DD')}</p>,
    },
    ,
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (index, record) => (
        <Link to={`details/${record._id}`}>
          <Button icon={<EyeOutlined />} type="primary"></Button>
        </Link>
      ),
    },
  ]
  return (
    <Table
      bordered
      columns={columns}
      dataSource={listdata ? listdata : []}
      footer={() => 'Click button to view details'}
      title={() => 'List of requests for for leave'}
    />
  )
}
export default ListRequests
