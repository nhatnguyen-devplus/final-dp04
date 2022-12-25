import { BrDaysoffIndexAdmin, BrDaysoffIndexClient } from '@app/components/Breadcrumbs/data'
import ListRequests from '@app/components/DetailsRequest/list'
import ViewHeader from '@app/components/ViewHeader'
import { getAllDaysOff } from '@app/redux/daysOff/actions'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Daysoff = () => {
  const { role } = useSelector((state) => state.login)
  const { dataList, loading } = useSelector((state) => state.daysOff)
  const dispatch = useDispatch()
  const allDaysOff = useCallback((data) => dispatch(getAllDaysOff(data)), [dispatch])

  useEffect(() => {
    allDaysOff({
      from: '',
      to: '',
    })
  }, [])
  const filterDayOff = (value) => {
    allDaysOff(value)
  }
  return (
    <>
      <ViewHeader breadcrumbs={'Admin' === role ? BrDaysoffIndexAdmin : BrDaysoffIndexClient} />
      <ListRequests
        dayOffLoading={loading}
        filterData={(data) => filterDayOff(data)}
        listdata={dataList ? dataList.reverse() : []}
      />
    </>
  )
}
export default Daysoff
