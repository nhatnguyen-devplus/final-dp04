import ListRequests from '@app/components/DetailsRequest/list'
import ViewHeader from '@app/components/ViewHeader'
import { getAllDaysOff } from '@app/redux/daysOff/actions'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Daysoff = () => {
  const { dataList } = useSelector((state) => state.daysOff)
  const dispatch = useDispatch()
  const allDaysOff = useCallback(() => dispatch(getAllDaysOff()), [dispatch])

  useEffect(() => {
    allDaysOff()
  }, [])

  const breadcrumbs = {
    data: [
      {
        title: 'Days Off ',
        path: '/admin/daysoff',
      },
    ],
    spread: '/',
  }
  return (
    <>
      <ViewHeader breadcrumbs={breadcrumbs} />
      <ListRequests listdata={dataList} />
    </>
  )
}
export default Daysoff
