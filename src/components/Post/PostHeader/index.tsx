import React from 'react';
import {Post} from '@domain/Post/entities';
import {Box} from '@components/Box';
import {Text} from '@components/Text';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import {ProfileAvatar} from '@components/ProfileAvatar';
type Props = Pick<Post, 'author'>;
export function PostHeader({author}: Props) {
  const navigation = useNavigation();

  function navigateTpProfile() {
    navigation.navigate('ProfileScreen', {userId: author.id});
  }
  return (
    <Pressable onPress={navigateTpProfile}>
      <Box flexDirection="row" alignItems="center" mb="s16">
        <ProfileAvatar imageURL={author.profileURL} />
        <Text ml="s12" semiBold preset="paragraphMedium">
          {author.userName}
        </Text>
      </Box>
    </Pressable>
  );
}
