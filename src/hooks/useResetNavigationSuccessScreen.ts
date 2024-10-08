import {useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '@routes/StackNavigator/AuthStack';

export function useResetNavigationSuccessScreen() {
  const navigation = useNavigation();

  function reset(params: AuthStackParamList['SuccessScreen']) {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'LoginScreen',
        },
        {
          name: 'SuccessScreen',
          params: params,
        },
      ],
    });
  }

  return {reset};
}
