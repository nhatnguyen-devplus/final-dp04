import { PlusOutlined } from '@ant-design/icons'
import ViewHeader from '@app/components/ViewHeader'
import { Button, Table } from 'antd'
import { Link } from 'react-router-dom'
import { data } from './Groups.data'

const Groups = () => {
  const breadcrumbs = {
    data: [
      {
        title: 'Groups ',
        path: '/admin/groups',
      },
    ],
    spread: '/',
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: 'Group Name',
      dataIndex: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      id: 'id',
      width: '15%',
      render: (index, record) => (
        <>
          <Link to={`details/${record.id}`}>
            <Button className="btn-mr15" type="primary">
              View
            </Button>
          </Link>
          <Link to={`delete/${record.id}`}>
            <Button danger type="primary">
              Delete
            </Button>
          </Link>
        </>
      ),
    },
  ]

  return (
    <>
      <ViewHeader breadcrumbs={breadcrumbs} />
      <Table
        bordered
        columns={columns}
        dataSource={data}
        title={() => (
          <>
            <span>List of Groups</span>
            <Link to="create">
              <Button className="btn-create" icon={<PlusOutlined />}>
                Create
              </Button>
            </Link>
          </>
        )}
      />
    </>
  )
}

export default Groups
