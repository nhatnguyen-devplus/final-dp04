import { Table,  Button, Avatar} from 'antd'
import { Link } from 'react-router-dom'
import ViewHeader from '@app/components/ViewHeader'
import { data } from './Members.data'

const Members = () => {
  const breadcrumbs = {
    data: [
      {
        title: 'Members ',
        path: '/admin/requets',
      },
    ],
    spread: '/',
  }
  const columns = [
    {
      title: '#',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Avatar',
      dataIndex: 'image',
      render: (image) => <Avatar size={'large'} src={image} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Group',
      dataIndex: 'group',
    },
    ,
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      width: '15%',
      render: (record) => (
        <>
          <Link to={`details/${record}`}>
            <Button className="btn-mr15" type="primary">
              View
            </Button>
          </Link>
          <Link to={`delete/${record}`}>
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
            <span>List of Members</span>
            <Link to="create">
              <Button style={{ float: 'right', marginRight: 12 }}>Create</Button>
            </Link>
          </>
        )}
        dataSource={data}
        rowKey={'id'}
      />
    </>
  )
}
export default Members
