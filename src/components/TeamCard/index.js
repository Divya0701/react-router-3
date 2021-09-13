// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {item} = props
  const {name, id, teamImageUrl} = item

  return (
    <Link to={`/team-matches/${id}`} className="card-bg-container">
      <li className="card-container">
        <img src={teamImageUrl} alt={name} className="team-logo" />
        <p className="para">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
