import ListRequests from '@app/components/DetailsRequest/list'
import { data } from '@app/components/Requests/Requests.data'
import ViewHeader from '@app/components/ViewHeader'

const Daysoff = () => {
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
      <ListRequests listdata={data} />
    </>
  )
}
export default Daysoff
