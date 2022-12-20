import { getDataSheet } from '@app/redux/sheet/actions'
import { Button, Card, Col, Form, Row, DatePicker, Radio, Input, notification } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
dayjs.extend(customParseFormat)

const { RangePicker } = DatePicker
const GoogleSheet = () => {
  const csvLink = useRef()
  const [isInput, setIsInput] = useState(false)
  const [type, setType] = useState()
  const [spreadsheetId, setSpreadsheetId] = useState()
  const { data, response, error } = useSelector((state) => state.sheet)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const getGoogleSheet = useCallback((data) => dispatch(getDataSheet(data)), [dispatch])
  const dateFormat = 'YYYY/MM/DD'

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }

  const onFinish = (values) => {
    const url = values?.spreadsheetId
    const capturedId = url && url.match(/\/d\/(.+)\//)

    getGoogleSheet({
      from: values.date[0].format(dateFormat),
      to: values.date[1].format(dateFormat),
      type: values.type,
      spreadsheetId: capturedId ? capturedId[1] : '',
    })
    setType(values.type)
    setSpreadsheetId(values.spreadsheetId)
  }

  useEffect(() => {
    if (null !== response) {
      if (response.status && 200 === response.status) {
        openNotificationWithIcon('success', response.message)
        setIsInput('')
        form.resetFields()
        if ('Download' === type) {
          csvLink.current.link.click()
        } else {
          window.open(spreadsheetId)
        }
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
    <>
      {contextHolder}
      <div className="site-card-border-less-wrapper">
        <Card
          bordered={true}
          className="card-boxshadow"
          style={{
            width: '100%',
          }}
          title="Google sheet"
        >
          <Row>
            <Col span={12}>
              <Form form={form} layout={'vertical'} onFinish={onFinish}>
                <Form.Item
                  label="Enter date:"
                  name={'date'}
                  rules={[
                    {
                      required: true,
                      message: 'Please pick from time!',
                    },
                  ]}
                >
                  <RangePicker format={dateFormat} />
                </Form.Item>
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
                    <Radio value="Link" onChange={() => setIsInput(true)}>
                      Google Sheet
                    </Radio>
                    <Radio value="Download" onChange={() => setIsInput(false)}>
                      CSV or Excel
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
                      data={data || []}
                      filename={'days-off.csv'}
                      ref={csvLink}
                      style={{ display: 'none' }}
                      target="_blank"
                    />
                    Submit
                  </Button>
                  <Link to={'/admin'}>
                    <Button
                      htmlType="button"
                      style={{
                        margin: '0 8px',
                      }}
                    >
                      Back
                    </Button>
                  </Link>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  )
}

export default GoogleSheet
