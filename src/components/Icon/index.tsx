import React from 'react';
import {EyeOnIcon} from '../../assets/icons/EyeOnIcon';
import {EyeOffIcon} from '../../assets/icons/EyeOffIcon';
import {ThemeColors} from '../../theme/theme';
import {useAppTheme} from '../../hooks/useAppTheme';
import {ArrowLeftIcon} from '../../assets/icons/ArrowLeftIcon';
import {ArrowRightIcon} from '../../assets/icons/ArrowRightIcon';
import {BellIcon} from '../../assets/icons/BellIcon';
import {BellOnIcon} from '../../assets/icons/BellOnIcon';
import {BookmarkIcon} from '../../assets/icons/BookmarkIcon';
import {BookmarkFillIcon} from '../../assets/icons/BookmarkFillIcon';
import {CameraIcon} from '../../assets/icons/CameraIcon';
import {ChatIcon} from '../../assets/icons/ChatIcon';
import {ChatOnIcon} from '../../assets/icons/ChatOnIcon';
import {CheckIcon} from '../../assets/icons/CheckIcon';
import {CommentIcon} from '../../assets/icons/CommentIcon';
import {ChevronRightIcon} from '../../assets/icons/ChevronRightIcon';
import {FlashOnIcon} from '../../assets/icons/FlashOnIcon';
import {FlashOffIcon} from '../../assets/icons/FlashOffIcon';
import {HeartIcon} from '../../assets/icons/HeartIcon';
import {HeartFillIcon} from '../../assets/icons/HeartFillIcon';
import {HomeIcon} from '../../assets/icons/HomeIcon';
import {HomeFillIcon} from '../../assets/icons/HomeFillIcon';
import {MessageIcon} from '../../assets/icons/MessageIcon';
import {NewPostIcon} from '../../assets/icons/NewPostIcon';
import {ProfileIcon} from '../../assets/icons/ProfileIcon';
import {ProfileFillIcon} from '../../assets/icons/ProfileFillIcon';
import {SearchIcon} from '../../assets/icons/SearchIcon';
import {SettingsIcon} from '../../assets/icons/SettingsIcon';
import {TrashIcon} from '../../assets/icons/TrashIcon';
import {CheckRoundIcon} from '../../assets/icons/CheckRound';
import {Pressable} from 'react-native';
import {MessageRoundIcon} from '../../assets/icons/MessageRound';
import {ErrorRoundIcon} from '@assets/icons/ErrorRoundIcon';

const IconsRegistry = {
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  bell: BellIcon,
  bellOn: BellOnIcon,
  bookmark: BookmarkIcon,
  bookmarkFill: BookmarkFillIcon,
  camera: CameraIcon,
  chat: ChatIcon,
  chatOn: ChatOnIcon,
  check: CheckIcon,
  comment: CommentIcon,
  chevronRight: ChevronRightIcon,
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  flashOn: FlashOnIcon,
  flashOff: FlashOffIcon,
  heart: HeartIcon,
  heartFill: HeartFillIcon,
  home: HomeIcon,
  homeFill: HomeFillIcon,
  message: MessageIcon,
  newPost: NewPostIcon,
  profile: ProfileIcon,
  profileFill: ProfileFillIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  trash: TrashIcon,
  checkRound: CheckRoundIcon,
  errorRound: ErrorRoundIcon,
  messageRound: MessageRoundIcon,
};
export type IconName = keyof typeof IconsRegistry;

export type IconBase = {
  size?: number;
  color?: string;
};

export type IconSvgProps = {
  name: IconName;
  color?: ThemeColors;
  size?: number;
  onPress?: () => void;
};

export function Icon({
  name,
  color = 'backgroundContrast',
  size,
  onPress,
}: IconSvgProps) {
  const {colors} = useAppTheme();
  const SvgIcon = IconsRegistry[name];
  if (onPress) {
    return (
      <Pressable testID={name} onPress={onPress} hitSlop={10}>
        <SvgIcon color={colors[color]} size={size} />
      </Pressable>
    );
  }
  return <SvgIcon color={colors[color]} size={size} />;
}
