import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const resolve = await fetch('https://apis.ccbp.in/ipl')
    const data = await resolve.json()

    const updatedData = data.teams.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      teamImageUrl: eachItem.team_image_url,
    }))
    this.setState({teamsList: updatedData, isLoading: false})
  }

  render() {
    const {teamsList, isLoading} = this.state
    return (
      <div className="home-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="container">
            <div className="inner-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="logo"
              />
              <h1 className="main-heading">IPL Dashboard</h1>
            </div>
            <ul className="list-container">
              {teamsList.map(eachItem => (
                <TeamCard item={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
