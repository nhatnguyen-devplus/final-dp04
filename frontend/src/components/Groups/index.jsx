import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { BrGroupsIndexAdmin, BrGroupsIndexClient } from '@app/components/Breadcrumbs/data'
import ViewHeader from '@app/components/ViewHeader'
import { getAllGroups, deleteGroup } from '@app/redux/groups/actions'
import { Button, Table, Avatar, Modal, Tooltip, notification } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Groups = () => {
  const { role } = useSelector((state) => state.login)
  const { dataList, response } = useSelector((state) => state.groups)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [del, setDel] = useState()
  const dispatch = useDispatch()
  const allGroups = useCallback(() => dispatch(getAllGroups()), [dispatch])
  const deleteGroupById = useCallback((_id) => dispatch(deleteGroup(_id)), [dispatch])

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }

  useEffect(() => {
    if (null !== response) {
      if (response.status && 200 === response.status) {
        openNotificationWithIcon('success', response.message)
      } else {
        openNotificationWithIcon('error', response.message)
      }

      allGroups()
    }
  }, [response])
  useEffect(() => {
    allGroups()
  }, [])
  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const handleDelete = () => {
    deleteGroupById(del)
    setIsModalOpen(!isModalOpen)
  }
  const columns = [
    {
      title: '#',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Group Name',
      dataIndex: 'name',
    },
    {
      title: 'Staff',
      dataIndex: 'staffs',
      render: (members) => (
        <Avatar.Group
          maxCount={15}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
        >
          {members.map((item) => (
            <Tooltip key={item._id} placement="top" title={item.name ? item.name : 'no name'}>
              <Avatar icon={<UserOutlined />} size={'large'} src={item.image ? item.image : ''} />
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: 'Masters',
      dataIndex: 'masters',
      render: (masters) => (
        <Avatar.Group
          maxCount={3}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
        >
          {masters.map((item) => (
            <Tooltip key={item._id} placement="top" title={item.name ? item.name : 'no name'}>
              <Avatar icon={<UserOutlined />} size={'large'} src={item.image ? item.image : ''} />
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      id: 'id',
      width: '15%',
      render: (index, record) => (
        <>
          <Link to={`details/${record._id}`}>
            <Button className="btn-mr15" icon={<EyeOutlined />} type="primary"></Button>
          </Link>
          {'Admin' === role && (
            <Button
              danger
              icon={<DeleteOutlined />}
              type="primary"
              onClick={() => {
                setDel(record._id), showModal()
              }}
            ></Button>
          )}
        </>
      ),
    },
  ]

  return (
    <>
      {contextHolder}
      <ViewHeader breadcrumbs={'Admin' === role ? BrGroupsIndexAdmin : BrGroupsIndexClient} />
      <Table
        bordered
        columns={columns}
        dataSource={dataList ? dataList.reverse() : []}
        rowKey={'_id'}
        title={() => (
          <>
            <span>List of Groups</span>
            <Link to="create">
              {'Admin' === role && (
                <Button className="btn-create" icon={<PlusOutlined />}>
                  Create
                </Button>
              )}
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
        <p>Do you want to delete this group? </p>
      </Modal>
    </>
  )
}

export default Groups
