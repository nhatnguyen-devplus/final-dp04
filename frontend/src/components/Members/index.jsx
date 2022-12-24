import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { BrMembersIndexAdmin, BrMembersIndexClient } from '@app/components/Breadcrumbs/data'
import ViewHeader from '@app/components/ViewHeader'
import { getAllUsers, deleteUser } from '@app/redux/members/actions'
import { Table, Button, Avatar, Modal, notification, Spin } from 'antd'
import { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Members = () => {
  const { role } = useSelector((state) => state.login)
  const members = useSelector((state) => state.members.data)
  const { response, loading } = useSelector((state) => state.members)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [del, setDel] = useState(null)
  const dispatch = useDispatch()
  const getAllMembers = useCallback(() => dispatch(getAllUsers()), [dispatch])
  const deleteMember = useCallback((del) => dispatch(deleteUser(del)), [dispatch])
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }

  useEffect(() => {
    getAllMembers()
  }, [])

  useEffect(() => {
    if (null !== response) {
      if (response.status && 200 === response.status) {
        openNotificationWithIcon('success', response.message)
      } else {
        openNotificationWithIcon('error', response.message)
      }

      getAllMembers()
    }
  }, [response])

  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const handleDelete = () => {
    deleteMember(del)
    setIsModalOpen(!isModalOpen)
  }

  const columns = [
    {
      title: '#',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Avatar',
      dataIndex: 'image',
      render: (image) => <Avatar icon={<UserOutlined />} size={'large'} src={image} />,
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
      dataIndex: 'groupsId',
      render: (groupsId) => 0 < groupsId.length && groupsId.map((group) => group.name).join(', '),
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
          <Link to={`edit/${record}`}>
            <Button className="btn-mr15" icon={<EditOutlined />} type="primary"></Button>
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
    <Spin spinning={loading}>
      {members && (
        <>
          <ViewHeader breadcrumbs={'Admin' === role ? BrMembersIndexAdmin : BrMembersIndexClient} />
          {contextHolder}
          <Table
            bordered
            columns={columns}
            dataSource={members.data ? members.data.reverse() : []}
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
      )}
    </Spin>
  )
}
export default Members
