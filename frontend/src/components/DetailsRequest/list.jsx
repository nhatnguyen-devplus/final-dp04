import { DownloadOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { getDataSheet } from '@app/redux/sheet/actions'
import { Button, DatePicker, Table, Tag, Form, Row, Col, Modal, Radio, Input, notification } from 'antd'
import moment from 'moment'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '@app/components/Requests/Requests.scss'

const { RangePicker } = DatePicker
const ListRequests = ({ listdata, filterData }) => {
  const [formModal] = Form.useForm()
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [type, setType] = useState()
  const [isInput, setIsInput] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [spreadsheetId, setSpreadsheetId] = useState()
  const { role } = useSelector((state) => state.login)
  const { data, response, error } = useSelector((state) => state.sheet)
  const dispatch = useDispatch()
  const getGoogleSheet = useCallback((data) => dispatch(getDataSheet(data)), [dispatch])
  const dateFormat = 'YYYY/MM/DD'
  const formatDate = (date) => moment(date).format('YYYY-MM-DD')
  const csvLink = useRef()
  const dataCSV = [
    {
      name: '',
      from: '',
      to: '',
      reason: '',
      quantity: '',
      contentlog: '',
    },
  ]
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }
  const switchColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'processing'
      case 'Change Request':
        return 'warning'
      case 'Approve':
        return 'success'
      case 'Reject':
        return 'error'
      case 'Cancel':
        return 'default'
      default:
        return null
    }
  }
  const columns = [
    {
      title: '#',
      render: (text, record, index) => index + 1,
      width: '2%',
    },
    {
      title: 'Day Off',
      dataIndex: 'logofffrom',
      width: '16%',
      render: (text, record) => (
        <p>{text === record.logoffto ? formatDate(text) : `${formatDate(text)} - ${formatDate(record.logoffto)}`}</p>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'contentlog',
      width: '3%',
    },
    ,
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '3%',
    },
    {
      title: 'Name',
      dataIndex: 'user',
      render: (text) => <Link to="">{text.name}</Link>,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      render: (text) => <p className="line-clamp-2">{text}</p>,
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      render: (text) => (
        <div className="status">
          <Tag color={switchColor(text)}>{text}</Tag>
        </div>
      ),
    },
    ,
    {
      title: 'Create At',
      dataIndex: 'created_at',
      width: '10%',
      render: (text) => <p>{moment(text).format('YYYY-MM-DD')}</p>,
    },
    ,
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (index, record) => (
        <Link to={`details/${record._id}`}>
          <Button icon={<EyeOutlined />} type="primary"></Button>
        </Link>
      ),
    },
  ]
  const showModal = () => {
    setIsModalOpen(false)
    formModal.resetFields()
    setIsInput(false)
  }
  const onFinish = (values) => {
    filterData({
      from: values.date[0].format(dateFormat),
      to: values.date[1].format(dateFormat),
    })
  }
  const onGoogleSheet = (values) => {
    const url = values?.spreadsheetId
    const capturedId = url && url.match(/\/d\/(.+)\//)
    getGoogleSheet({
      from,
      to,
      type: values.type,
      spreadsheetId: capturedId ? capturedId[1] : '',
    })
    setType(values.type)
    setSpreadsheetId(values.spreadsheetId)
  }
  useEffect(() => {
    if (null !== response) {
      if (response.status && 200 === response.status) {
        if ('Download' === type) {
          csvLink.current.link.click()
        }
        if ('Link' === type) {
          window.open(spreadsheetId)
          setSpreadsheetId('')
        }
        showModal()
      } else {
        openNotificationWithIcon('error', response.message)
      }
    }
  }, [response])

  useEffect(() => {
    if (null !== error) {
      openNotificationWithIcon('error', 'Error creating log off failed')
    }
  }, [error])
  return (
    <Table
      bordered
      columns={columns}
      dataSource={listdata ? listdata : []}
      footer={() => 'Click button to view details'}
      title={() => (
        <Row>
          {contextHolder}
          <Col span={4}>
            <span>List of requests for for leave</span>
          </Col>
          {'Admin' === role && (
            <>
              <Col offset={12} span={8} style={{ marginBottom: '-20px' }}>
                <Form
                  initialValues={{
                    type: 'Download',
                  }}
                  layout={'vertical'}
                  style={{ display: 'flex' }}
                  onFinish={onFinish}
                >
                  <Form.Item name={'date'}>
                    <RangePicker
                      format={dateFormat}
                      onChange={(e) => {
                        setFrom(e[0].format(dateFormat))
                        setTo(e[1].format(dateFormat))
                      }}
                    />
                  </Form.Item>
                  <Form.Item></Form.Item>
                  <Button htmlType="submit" style={{ marginLeft: '2px' }} type="primary">
                    <SearchOutlined />
                  </Button>
                  <Button style={{ marginLeft: '10px' }} onClick={() => setIsModalOpen(true)}>
                    <DownloadOutlined />
                  </Button>
                </Form>
              </Col>
              <Modal
                footer={false}
                open={isModalOpen}
                style={{
                  top: 150,
                }}
                title="Download"
                onCancel={showModal}
              >
                <Form
                  form={formModal}
                  initialValues={{
                    type: 'Download',
                  }}
                  layout={'vertical'}
                  onFinish={onGoogleSheet}
                >
                  <Form.Item
                    label="Choose"
                    name={'type'}
                    rules={[
                      {
                        required: true,
                        message: 'Cannot be left blank!',
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="Download" onChange={() => setIsInput(false)}>
                        CSV or Excel
                      </Radio>
                      <Radio value="Link" onChange={() => setIsInput(true)}>
                        Google Sheet
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  {isInput && (
                    <Form.Item
                      label="Google sheet link:"
                      name="spreadsheetId"
                      rules={[
                        {
                          required: true,
                          message: 'Path cannot be empty!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      <CSVLink
                        data={data && 0 < data.length ? data : dataCSV}
                        filename={'days-off.csv'}
                        ref={csvLink}
                        style={{ display: 'none' }}
                        target="_blank"
                      />
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </>
          )}
        </Row>
      )}
    />
  )
}
export default ListRequests
