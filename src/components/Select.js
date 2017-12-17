import React from 'react';

const Select = props => (
  <select
    name={props.name}
    value={props.selectedOption}
    onChange={props.controlFunc}
    className="form-select"
  >
    <option value="">{props.placeholder}</option>
    {props.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
  </select>
);

export default Select;
