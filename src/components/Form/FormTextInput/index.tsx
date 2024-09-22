import React from 'react';
import {TextInput, TextInputProps} from '../../TextInput';
import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';

type FormTextInput<T extends FieldValues> = UseControllerProps<T> &
  TextInputProps;
export function FormTextInput<T extends FieldValues>({
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
        <TextInput
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
