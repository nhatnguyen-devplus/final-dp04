import { PlusOutlined } from '@ant-design/icons'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import ViewHeader from '@app/components/ViewHeader'
import { Button, Table, Avatar, Modal } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { data } from './Groups.data'

const Groups = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [del, setDel] = useState(null)
  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const handleDelete = () => {
    setIsModalOpen(!isModalOpen)
  }
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
      title: 'Members',
      dataIndex: 'members',
      render: (members) => (
        <Avatar.Group
          maxCount={15}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
        >
          {members.map((item) => (
            <Avatar key={item.id} size={'large'} src={item.image} />
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
            <Avatar key={item.id} size={'large'} src={item.image} />
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
          <Link to={`details/${record.id}`}>
            <Button className="btn-mr15" icon=<EyeOutlined /> type="primary"></Button>
          </Link>
          <Button
            danger
            icon=<DeleteOutlined />
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
        dataSource={data}
        rowKey={'id'}
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
