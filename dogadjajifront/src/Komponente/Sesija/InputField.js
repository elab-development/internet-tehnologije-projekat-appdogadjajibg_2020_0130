 
import React from 'react';

const InputField = ({ id, label, type, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;
