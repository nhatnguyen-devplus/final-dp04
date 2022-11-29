import Api from '@app/config/httpRequest'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [data, setData] = useState('')
  const fectData = async () => {
    try {
      const data = await Api.get('/')
      setData(data)
    } catch (error) {
      //handle error API
    }
  }

  useEffect(() => {
    fectData()
  })

  return <>{data}</>
}

export default Dashboard
