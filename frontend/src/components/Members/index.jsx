import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import ViewHeader from '@app/components/ViewHeader'
import { getAllUsers } from '@app/redux/members/actions'
import { Table, Button, Avatar, Modal } from 'antd'
import { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Members = () => {
  const members = useSelector((state) => state.members.data)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [del, setDel] = useState()
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
        path: '/admin/members',
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
      dataIndex: '_id',
      width: '15%',
      render: (record) => (
        <>
          <Link to={`details/${record}`}>
            <Button className="btn-mr15" icon={<EyeOutlined />} type="primary"></Button>
          </Link>

          <Button
            danger
            icon={<DeleteOutlined />}
            type="primary"
            onClick={() => {
              setDel(record), showModal()
            }}
          ></Button>
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
        dataSource={members.data}
        rowKey={'_id'}
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
      />
      <Modal
        footer={[
          <>
            <Button onClick={showModal}>Cancel</Button>
            <Button danger type="primary" onClick={handleDelete}>
              Delete
            </Button>
          </>,
        ]}
        open={isModalOpen}
        style={{
          top: 250,
        }}
        title="Delete?"
        onCancel={showModal}
      >
        <p>Do you want to delete this member? </p>
      </Modal>
    </>
  )
}
export default Members
