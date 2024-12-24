import {PasswordInput} from '@components/PasswordInput';
import {fireEvent, screen} from '@testing-library/react-native';
import {render} from '../../../test/test-utils';
import {IconSvgProps} from '@components/Icon';

describe('<PasswordInput />', () => {
  test('when pressing the eye icon, it should show the password, and change to the eye off icon', () => {
    const mockedOnChange = jest.fn();
    render(
      <PasswordInput
        label="Password"
        placeholder="password"
        value="123456"
        onChangeText={mockedOnChange}
      />,
    );

    const eyeIcon: IconSvgProps['name'] = 'eyeOn';
    fireEvent.press(screen.getByTestId(eyeIcon));

    const eyeOffIcon: IconSvgProps['name'] = 'eyeOff';
    const eyeOffIconElement = screen.getByTestId(eyeOffIcon);

    expect(eyeOffIconElement).toBeTruthy();

    const inputElement = screen.getByPlaceholderText(/password/);

    expect(inputElement.props.secureTextEntry).toBeFalsy();
  });
});
