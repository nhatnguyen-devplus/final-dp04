import { EyeOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { Link } from 'react-router-dom'

const ListRequests = ({ listdata }) => {
  const columns = [
    {
      title: '#',
      render: (text, record, index) => index + 1,
      width: '2%',
    },
    {
      title: 'Day Off',
      dataIndex: 'dayoff',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      width: '3%',
    },
    {
      title: 'Name',
      dataIndex: 'user',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    ,
    {
      title: 'Create At',
      dataIndex: 'created_at',
    },
    ,
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (index, record) => (
        <Link to={`details/${record.key}`}>
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
