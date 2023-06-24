// Write your code here
import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apistatus = {
  initial: 'INITIAl',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class CowinDashboard extends Component {
  state = {
    last7DaysVaccinationData: [],
    vaccinationByAgeData: [],
    vaccinationByGenderData: [],
    APIFetchStatus: apistatus.initial,
  }

  componentDidMount() {
    this.getTheVaccinationData()
  }

  getTheVaccinationData = async () => {
    this.setState({APIFetchStatus: apistatus.inProcess})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    if (response.ok) {
      const formattedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const {
        last7DaysVaccination,
        vaccinationByAge,
        vaccinationByGender,
      } = formattedData
      const formattedLast7DaysVaccination = last7DaysVaccination.map(
        eachData => ({
          vaccineDate: eachData.vaccine_date,
          dose1: eachData.dose_1,
          dose2: eachData.dose_2,
        }),
      )
      this.setState({
        last7DaysVaccinationData: formattedLast7DaysVaccination,
        vaccinationByAgeData: vaccinationByAge,
        vaccinationByGenderData: vaccinationByGender,
        APIFetchStatus: apistatus.success,
      })
    } else if (response.status === 401) {
      this.setState({
        APIFetchStatus: apistatus.failure,
      })
    }
  }

  getTheBarGraph = () => {
    const {last7DaysVaccinationData} = this.state
    console.log('Bar Graph')
    return (
      <VaccinationCoverage
        last7DaysVaccinationData={last7DaysVaccinationData}
      />
    )
  }

  getTheSemiPieChart = () => {
    const {vaccinationByGenderData} = this.state
    return (
      <VaccinationByGender vaccinationByGenderData={vaccinationByGenderData} />
    )
  }

  getThePieChart = () => {
    const {vaccinationByAgeData} = this.state
    return <VaccinationByAge vaccinationByAgeData={vaccinationByAgeData} />
  }

  renderProcessVIew = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderSuccessView = () => (
    <>
      {this.getTheBarGraph()}
      {this.getTheSemiPieChart()}
      {this.getThePieChart()}
    </>
  )

  renderTheViews = () => {
    const {APIFetchStatus} = this.state
    switch (APIFetchStatus) {
      case apistatus.success:
        return this.renderSuccessView()
      case apistatus.failure:
        return this.renderFailureView()
      case apistatus.inProcess:
        return this.renderProcessVIew()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="app-name-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <p className="app-name">Co-WIN</p>
        </div>
        <h1 className="app-heading">CoWIN Vaccination in India</h1>
        <div className="views-container">{this.renderTheViews()}</div>
      </div>
    )
  }
}

export default CowinDashboard
