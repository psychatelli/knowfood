import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Input} from 'react-materialize';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  label
}) => {
  return ( 


    <span>

  <Input 
  type="text" 
  label={label} 
  s={12} 
  className={classnames('form-control', {
    'is-invalid': error
  })}
  placeholder={placeholder}
  name={name}
  value={value}
  onChange={onChange}
  />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
  </span>



  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,

};

export default TextAreaFieldGroup;
