import React from 'react'
import Table from './components/Table'

export default function page() {
  return (
    <div>
      <ul className="steps steps-horizontal lg:steps-horizontal flex justify-center mb-4">
      <li className="step step-primary">Select</li>
      <li className="step">Run & Log</li>
      </ul>
      <Table/>
        
    </div>
  )
}
