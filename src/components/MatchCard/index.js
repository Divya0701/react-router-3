// Write your code here
import './index.css'

const MatchCard = props => {
  const {item} = props
  const {result, competingTeam, competingTeamLogo, matchStatus} = item

  return (
    <li className="match-container">
      <img src={competingTeamLogo} alt={`competing team ${competingTeam}`} />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
