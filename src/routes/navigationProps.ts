import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@routes/StackNavigator/AuthStack';
import {AppStackParamList} from '@routes/StackNavigator/AppStack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AppTabBottomTabParamList} from '@routes/TabNavigator/AppTabNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList, AppStackParamList {}
  }
}

export type AuthRoutes<RouteName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, RouteName>;

export type AppRoutes<RouteName extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, RouteName>;

export type AppTabScreenProps<
  TabScreen extends keyof AppTabBottomTabParamList,
> = CompositeScreenProps<
  BottomTabScreenProps<AppTabBottomTabParamList, TabScreen>,
  NativeStackScreenProps<AppStackParamList>
>;
