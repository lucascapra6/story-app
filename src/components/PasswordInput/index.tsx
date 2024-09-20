import React, {useState} from 'react';
import {TextInput, TextInputProps} from '../TextInput';
import {Icon} from '../Icon';

export function PasswordInput(
  inputProps: Omit<TextInputProps, 'RightComponent'>,
) {
  const [isSecurityTextEntry, setIsSecurityTextEntry] = useState(true);

  function togglePasswordVisibility() {
    setIsSecurityTextEntry(prevState => !prevState);
  }
  return (
    <TextInput
      secureTextEntry={isSecurityTextEntry}
      {...inputProps}
      RightComponent={
        <Icon
          name={isSecurityTextEntry ? 'eyeOn' : 'eyeOff'}
          onPress={togglePasswordVisibility}
          color="gray2"
        />
      }
    />
  );
}
