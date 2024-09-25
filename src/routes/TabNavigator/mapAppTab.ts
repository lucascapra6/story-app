import {IconName} from '@components/Icon';
import {AppTabBottomTabParamList} from '@routes/TabNavigator/AppTabNavigator';

export const mapAppTab: Record<
  keyof AppTabBottomTabParamList,
  {
    label: string;
    icon: {
      focused: IconName;
      unfocused: IconName;
    };
  }
> = {
  HomeScreen: {
    label: 'Início',
    icon: {
      focused: 'homeFill',
      unfocused: 'home',
    },
  },
  NewPostScreen: {
    label: 'Novo post',
    icon: {
      focused: 'newPost',
      unfocused: 'newPost',
    },
  },
  FavoriteScreen: {
    label: 'Favoritos',
    icon: {
      focused: 'bookmarkFill',
      unfocused: 'bookmark',
    },
  },
  MyProfileScreen: {
    label: 'Meu perfil',
    icon: {
      focused: 'profileFill',
      unfocused: 'profile',
    },
  },
};
