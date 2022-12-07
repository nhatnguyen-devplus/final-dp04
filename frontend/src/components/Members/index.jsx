import { Table, Button, Avatar, Modal } from 'antd'
import { Link } from 'react-router-dom'
import ViewHeader from '@app/components/ViewHeader'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '@app/redux/members/actions'
import { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'

const Members = () => {
  const members = useSelector((state) => state.members.data)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [del, setDel] = useState(null)
  const dispatch = useDispatch()
  const getAllMembers = useCallback(() => dispatch(getAllUsers()), [dispatch])

  useEffect(() => {
    getAllMembers()
  }, [])


  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const handleDelete = () => {
    setIsModalOpen(!isModalOpen)
  }
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

          <Button
            danger
            type="primary"
            onClick={() => {
              setDel(record), showModal()
            }}
          >
            Delete
          </Button>
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
              <Button className="btn-create" icon={<PlusOutlined />}>
                Create
              </Button>
            </Link>
          </>
        )}
        dataSource={members.data}
        rowKey={'_id'}
      />
      <Modal
        title="Delete?"
        style={{
          top: 250,
        }}
        open={isModalOpen}
        onCancel={showModal}
        footer={[
          <>
            <Button onClick={showModal}>Cancel</Button>
            <Button danger type="primary" onClick={handleDelete}>
              Delete
            </Button>
          </>,
        ]}
      >
        <p>Do you want to delete this member? </p>
      </Modal>
    </>
  )
}
export default Members
