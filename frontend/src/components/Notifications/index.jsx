import { getNotifications, seenNotifications } from '@app/redux/notifications/action'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, Button, Space, Dropdown, Typography, notification } from 'antd'
import { useCallback, useEffect } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Notification.scss'

const { Text } = Typography
const Notifications = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { response, error } = useSelector((state) => state.notifications)
  const noties = useSelector((state) => state.notifications.data)
  const dispatch = useDispatch()
  const getNoties = useCallback(() => dispatch(getNotifications()), [dispatch])
  const seenNoties = useCallback((_id) => dispatch(seenNotifications(_id)), [dispatch])
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }

  const handleSeen = (id) => {
    seenNoties(id)
  }

  useEffect(() => {
    if (response) {
      if (response.status && 200 === response.status) {
        navigate(`requests/details/${response?.data?.logoff}`)
      } else {
        openNotificationWithIcon('error', response.message)
      }
      getNoties()
    }
  }, [response])

  useEffect(() => {
    if (null !== error) {
      openNotificationWithIcon('error', 'Can get this notification')
    }
  }, [error])

  const items =
    0 < noties?.length
      ? noties?.map((item, index) => ({
          label: (
            <Link onClick={() => handleSeen(item?._id)}>
              <Text strong>{item.from?.name}</Text>
              {item.description}
            </Link>
          ),
          key: index,
        }))
      : [
          {
            label: "You don't have any notifications yet",
            key: '0',
          },
        ]

  const countNoti = 0 < noties?.length ? items.length : null
  useEffect(() => {
    getNoties()
  }, [params])
  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items }} trigger={['click']}>
        <a style={{ marginRight: '20px' }} onClick={(e) => e.preventDefault()}>
          <Space size="middle">
            <Badge count={countNoti} size="small">
              <Button icon className="noties-btn" shape="circle">
                <FontAwesomeIcon icon={faBell} />
              </Button>
            </Badge>
          </Space>
        </a>
      </Dropdown>
    </>
  )
}

export default Notifications
