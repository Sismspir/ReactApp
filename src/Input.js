import React from 'react';
import TextField from '@material-ui/core/TextField';

function InputField(props) {
  const {name, onChange} = props

  return (
    <TextField
      placeholder="Enter your text here"
      label="User's name"
      variant="outlined"
      margin="normal"
      value={name}
      onChange={onChange}
      InputProps={{
        style: {
          backgroundColor: '#d5d0f5', // set background color
        },
      }}
    />
  );
}

export default InputField;
