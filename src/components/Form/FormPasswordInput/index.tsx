import React from 'react';
import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';
import {PasswordInput} from '../../PasswordInput';
import {TextInputProps} from '../../TextInput';

type FormTextInput<T extends FieldValues> = UseControllerProps<T> &
  TextInputProps;
export function FormPasswordInput<T extends FieldValues>({
  control,
  rules,
  name,
  ...textInputProps
}: FormTextInput<T>) {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({field, fieldState}) => (
        <PasswordInput
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value}
          errorMessage={fieldState.error?.message}
          {...textInputProps}
        />
      )}
      name={name}
    />
  );
}
