import ViewHeader from '@app/components/ViewHeader'
import { Button, Table } from 'antd'
// import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { data } from './Requests.data'

const Requests = () => {
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
        bordered
        columns={columns}
        dataSource={data}
        footer={() => 'Click button to view details'}
        title={() => 'List of requests for for leave'}
      />
    </>
  )
}
export default Requests
