// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    latestMatches: {},
    recentMatches: [],
    teamBannerUrl: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getResult()
  }

  getResult = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const resolve = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await resolve.json()
    const latestMatch = {
      umpires: data.latest_match_details.umpires,
      result: data.latest_match_details.result,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      id: data.latest_match_details.id,
      date: data.latest_match_details.date,
      venue: data.latest_match_details.venue,
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      matchStatus: data.latest_match_details.match_status,
    }

    const teamBannerUrls = data.team_banner_url

    const recentMatch = data.recent_matches.map(eachItem => ({
      umpires: eachItem.umpires,
      result: eachItem.result,
      manOfTheMatch: eachItem.man_of_the_match,
      id: eachItem.id,
      date: eachItem.date,
      venue: eachItem.venue,
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      firstInnings: eachItem.first_innings,
      secondInnings: eachItem.second_innings,
      matchStatus: eachItem.match_status,
    }))

    this.setState({
      latestMatches: latestMatch,
      recentMatches: recentMatch,
      teamBannerUrl: teamBannerUrls,
      isLoading: false,
    })
  }

  render() {
    const {latestMatches, recentMatches, teamBannerUrl, isLoading} = this.state
    return (
      <div className="banner-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="bannerImage"
            />
            <h1 className="head">Latest Matches</h1>
            <LatestMatch item={latestMatches} />
            <ul className="ul-container">
              {recentMatches.map(eachItem => (
                <MatchCard item={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
