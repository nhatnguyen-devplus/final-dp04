import { data } from './Requests.data'
import { Button, Form, Select, Table } from 'antd'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ViewHeader from '@app/components/ViewHeader'

const Requests = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const breadcrumbs = {
    data: [
      {
        title: 'Requests ',
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
      title: 'Day Off',
      dataIndex: 'dayoff',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      // align: '',
    },
    {
      title: 'Name',
      dataIndex: 'user',
      render: (text) => <a>{text}</a>,
    },
    ,
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
          <Button type="primary">View</Button>
        </Link>
      ),
    },
  ]
  return (
    <>
      <ViewHeader breadcrumbs={breadcrumbs} />
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => 'List of requests for for leave'}
        footer={() => 'Click button to view details'}
      />
    </>
  )
}
export default Requests
