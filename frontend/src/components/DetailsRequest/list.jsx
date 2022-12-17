import { EyeOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'

const ListRequests = ({ listdata }) => {
  const formatDate = (date) => moment(date).format('YYYY-MM-DD')

  const columns = [
    {
      title: '#',
      render: (text, record, index) => index + 1,
      width: '2%',
    },
    {
      title: 'Day Off',
      dataIndex: 'logofffrom',
      render: (text, record) => (
        <p>{text === record.logoffto ? formatDate(text) : `${formatDate(text)} - ${formatDate(record.logoffto)}`}</p>
      ),
    },
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <div className="status">
          <p className={0 < record.approval.length ? `status-approval` : `status-${text}`}>{text}</p>
        </div>
      ),
    },
    ,
    {
      title: 'Create At',
      dataIndex: 'created_at',
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
      dataSource={listdata}
      footer={() => 'Click button to view details'}
      title={() => 'List of requests for for leave'}
    />
  )
}
export default ListRequests
