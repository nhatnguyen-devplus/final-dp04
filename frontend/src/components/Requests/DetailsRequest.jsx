import { Card, Row } from 'antd'
import { useParams } from 'react-router-dom'
import '@app/components/Requests/Requests.scss'
import ViewHeader from '@app/components/ViewHeader'
import Histories from '@app/components/Histories'
import DetailsRequestLeftSide from '@app/components/DetailsRequest/details'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestById } from '@app/redux/requests/actions'

const DetailsRequest = () => {
  const { data } = useSelector((state) => state.requests)
  const dispatch = useDispatch()
  const getOneRequest = useCallback((id) => dispatch(getRequestById(id)), [dispatch])
  const params = useParams()
  const details = data ? data : {}

  useEffect(() => {
    getOneRequest(params.id)
  }, [])

  const breadcrumbs = {
    data: [
      {
        title: 'Requests ',
        path: '/admin/requests',
      },
      {
        title: 'Details ',
      },
    ],
    spread: '/',
  }
  const action = 'request'
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
export default DetailsRequest
