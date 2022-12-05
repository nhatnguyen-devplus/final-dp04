import { Table } from 'antd'
const Requests = () => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    title={() => 'Danh sách yêu cầu nghỉ phép'}
    footer={() => 'Footer'}
  />
)
export default Requests
