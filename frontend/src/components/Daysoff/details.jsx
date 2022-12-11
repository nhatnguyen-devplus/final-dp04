import { data } from '@app/components/Requests/Requests.data'
import { Card, Row } from 'antd'
import { useParams } from 'react-router-dom'
import '@app/components/Requests/Requests.scss'
import ViewHeader from '@app/components/ViewHeader'
import Histories from '@app/components/Histories'
import DetailsRequestLeftSide from '@app/components/DetailsRequest/details'

const DetailsDayOff = () => {
  const params = useParams()
  const details = data.find((item) => item.key === params.id)
  const breadcrumbs = {
    data: [
      {
        title: 'Day Off ',
        path: '/admin/daysoff',
      },
      {
        title: 'Details ',
      },
    ],
    spread: '/',
  }
  const action = 'dayoff'
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
          title="Log Off Details"
        >
          <Row>
            <DetailsRequestLeftSide action={action} details={details} />
            <Histories />
          </Row>
        </Card>
      </div>
    </>
  )
}
export default DetailsDayOff
