import React from 'react';
import {Platform, Pressable} from 'react-native';
import {Text} from '@components/Text';
interface Props {
  fetchNextPage: () => void;
  hasNextPage: boolean;
}
export function PostCommentBottom({fetchNextPage, hasNextPage}: Props) {
  if (hasNextPage) {
    return (
      <Pressable onPress={fetchNextPage}>
        <Text
          bold
          color="primary"
          textAlign="center"
          paddingBottom={Platform.select({ios: 's56'})}>
          Ver mais
        </Text>
      </Pressable>
    );
  }
  return null;
}
