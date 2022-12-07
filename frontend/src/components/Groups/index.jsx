import { Button, Table } from 'antd'
import { Link } from 'react-router-dom'
import ViewHeader from '@app/components/ViewHeader'
import { data } from './Groups.data'
import { PlusOutlined } from '@ant-design/icons'

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
            <Button type="primary" danger>
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
        columns={columns}
        bordered
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
        dataSource={data}
      />
    </>
  )
}

export default Groups
