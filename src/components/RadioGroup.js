import React from 'react';

const RadioGroup = props => (
  <fieldset className="form-options">
    <legend className="form-question">{props.question}</legend>
    <div className="radio-group">
      {props.options.map(option => (
        <p key={option.name} className="form-answer">
          <input
            type="radio"
            name={props.setName}
            value={option.name}
            onChange={props.handleFunc(option.name)}
            checked={props.setValue === option.name}
          />
          <label
            role="presentation"
            htmlFor={option.name}
            className="radio-label"
            onClick={props.handleFunc(option.name)}
          >
            {option.svg}
            {option.name}
          </label>
        </p>
      ))}
    </div>
  </fieldset>
);

export default RadioGroup;
