import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LoginLogo.scss'
const LogoLogin = () => (
  <div className="logo-login">
    <h1>
      <FontAwesomeIcon icon={faPowerOff} /> Log off SRS
    </h1>
  </div>
)
export default LogoLogin
