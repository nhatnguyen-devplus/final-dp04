import { Card, Row } from 'antd'
import { useParams } from 'react-router-dom'
import { data } from '@app/components/Requests/Requests.data'
import '@app/components/Requests/Requests.scss'
import ViewHeader from '@app/components/ViewHeader'
import Histories from '@app/components/Histories'
import DetailsRequestLeftSide from '@app/components/DetailsRequest/details'

const DetailsDayOff = () => {
  const params = useParams()
  const details = data.find((item) => item.key == params.id)
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
          title="Log Off Details"
          bordered={true}
          style={{
            width: '100%',
          }}
          className="card-boxshadow"
        >
          <Row>
            <DetailsRequestLeftSide details={details} action={action} />
            <Histories />
          </Row>
        </Card>
      </div>
    </>
  )
}
export default DetailsDayOff
