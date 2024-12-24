import React from 'react';
import {Button} from '../index';
import {render} from '../../../test/test-utils';
import {fireEvent, screen} from '@testing-library/react-native';
import {ButtonProps} from '../index';
import {StyleSheet} from 'react-native';
import {theme} from '@theme/theme';

function renderComponent(props?: Partial<ButtonProps>) {
  render(<Button title="Button Title" {...props} />);

  const titleElement = screen.getByText(/button title/i);

  return {
    titleElement,
  };
}
describe('<Button />', () => {
  test('the component rendered', () => {
    render(<Button title="button title" />);
  });

  it('calls the onPress function when is pressed', () => {
    const mockedOnPress = jest.fn();

    const {titleElement} = renderComponent({
      onPress: mockedOnPress,
    });

    fireEvent.press(titleElement);

    expect(mockedOnPress).toHaveBeenCalled();
  });

  it('does not call onPress function when it is disabled and it pressed ', () => {
    const mockedOnPress = jest.fn();
    const {titleElement} = renderComponent({
      onPress: mockedOnPress,
      disabled: true,
    });

    fireEvent.press(titleElement);
    expect(mockedOnPress).not.toHaveBeenCalled();
  });
  test('the title should be gray if button is disabled', () => {
    const {titleElement} = renderComponent({disabled: true});

    const titleStyle = StyleSheet.flatten(titleElement.props.style);

    expect(titleStyle.color).toEqual(theme.colors.gray2);
  });
});
