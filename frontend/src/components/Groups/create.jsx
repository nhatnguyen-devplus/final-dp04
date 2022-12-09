import { data } from '@app/components/Members/Members.data'
import ViewHeader from '@app/components/ViewHeader'
import { Card, Row, Col, Button, Form, Input, Select } from 'antd'
import { Link } from 'react-router-dom'

const CreateGroup = () => {
  const breadcrumbs = {
    data: [
      {
        title: 'Groups ',
        path: '/admin/groups',
      },
      {
        title: 'Create ',
      },
    ],
    spread: '/',
  }
  const onFinish = (values) => {
    console.log(values)
  }
  const filter = (input, option) =>
    0 <= option.props.children.toLowerCase().indexOf(input.toLowerCase()) ||
    0 <= option.props.value.toLowerCase().indexOf(input.toLowerCase())
  const options = data
  return (
    <>
      <ViewHeader breadcrumbs={breadcrumbs} />
      <div className="site-card-border-less-wrapper">
        <Card
          bordered={true}
          className="card-boxshadow"
          style={{
            width: '100%',
          }}
          title="Create Group Form"
        >
          <Row>
            <Col span={12}>
              <Form layout={'vertical'} onFinish={onFinish}>
                <Form.Item
                  label="Name Group"
                  name={['name']}
                  rules={[
                    {
                      required: true,
                      message: 'Please type name group!',
                    },
                  ]}
                >
                  <Input placeholder="Type name group" />
                </Form.Item>
                <Form.Item
                  label="Masters"
                  name={['masters']}
                  rules={[
                    {
                      required: true,
                      message: 'Please type master in group!',
                    },
                  ]}
                >
                  <Select
                    filterOption={(input, option) => filter(input, option)}
                    mode="multiple"
                    placeholder="Choose members"
                  >
                    {options.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Members"
                  name={['members']}
                  rules={[
                    {
                      required: true,
                      message: 'Please type members in group!',
                    },
                  ]}
                >
                  <Select
                    filterOption={(input, option) => filter(input, option)}
                    mode="multiple"
                    placeholder="Choose members"
                  >
                    {options.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Submit
                  </Button>
                  <Link to={'/admin/groups'}>
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
export default CreateGroup
