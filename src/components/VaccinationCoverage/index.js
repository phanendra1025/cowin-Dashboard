// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccinationData} = props
  console.log(last7DaysVaccinationData)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="bar-chart-container">
      <h1 className="bar-chart-heading">Vaccination Coverage</h1>
      <BarChart
        data={last7DaysVaccinationData}
        width={1000}
        height={480}
        margin={{top: 5}}
      >
        <XAxis dataKey="vaccineDate" tick={{stroke: 'gray', strokeWidth: 0}} />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{stroke: 'gray', strokeWidth: 0}}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
