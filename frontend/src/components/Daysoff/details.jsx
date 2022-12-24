import '@app/components/Requests/Requests.scss'
import { BrDaysoffDetailsAdmin, BrDaysoffDetailsClient } from '@app/components/Breadcrumbs/data'
import DetailsRequestLeftSide from '@app/components/DetailsRequest/details'
import Histories from '@app/components/Histories'
import ViewHeader from '@app/components/ViewHeader'
import { getRequestById } from '@app/redux/requests/actions'
import { Card, Row, Spin } from 'antd'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const DetailsDayOff = () => {
  const { role } = useSelector((state) => state.login)
  const { data, loading } = useSelector((state) => state.requests)
  const dispatch = useDispatch()
  const getOneRequest = useCallback((id) => dispatch(getRequestById(id)), [dispatch])
  const params = useParams()
  const details = data ? data : {}

  useEffect(() => {
    getOneRequest(params.id)
  }, [])

  const action = 'dayoff'
  return (
    <Spin spinning={loading}>
      <ViewHeader breadcrumbs={'Admin' === role ? BrDaysoffDetailsAdmin : BrDaysoffDetailsClient} />
      <div className="site-card-border-less-wrapper">
        <Card
          bordered={true}
          className="card-boxshadow"
          style={{
            width: '100%',
          }}
          title="Day Off Details"
        >
          <Row>
            <DetailsRequestLeftSide action={action} details={details} />
            <Histories />
          </Row>
        </Card>
      </div>
    </Spin>
  )
}
export default DetailsDayOff
