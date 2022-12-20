import ListRequests from '@app/components/DetailsRequest/list'
import ViewHeader from '@app/components/ViewHeader'
import { getAllDaysOff } from '@app/redux/daysOff/actions'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrDaysoffIndexAdmin, BrDaysoffIndexClient } from '@app/components/Breadcrumbs/data'

const Daysoff = () => {
  const { role } = useSelector((state) => state.login)
  const { dataList } = useSelector((state) => state.daysOff)
  const dispatch = useDispatch()
  const allDaysOff = useCallback(() => dispatch(getAllDaysOff()), [dispatch])

  useEffect(() => {
    allDaysOff()
  }, [])

  return (
    <>
      <ViewHeader breadcrumbs={'Admin' === role ? BrDaysoffIndexAdmin : BrDaysoffIndexClient} />
      <ListRequests listdata={dataList} />
    </>
  )
}
export default Daysoff
