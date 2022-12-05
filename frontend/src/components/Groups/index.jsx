import { Button, Table } from 'antd'
import { Link } from 'react-router-dom'
import ViewHeader from '@app/components/ViewHeader'
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
            <Button>Delete</Button>
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
            <Button style={{ float: 'right', marginRight: 12 }}>Create</Button>
          </>
        )}
        dataSource={data}
      />
    </>
  )
}

export default Groups
