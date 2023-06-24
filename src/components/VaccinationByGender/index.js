// Write your code here
import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenderData} = props
  return (
    <div className="semi-pie-chart-container">
      <h1 className="semi-pie-chart-heading">Vaccination By Gender</h1>
      <PieChart width={1000} height={350} align="center">
        <Pie
          cx="50%"
          cy="50%"
          data={vaccinationByGenderData}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />{' '}
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Other" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          horizontalAlign="middle"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
