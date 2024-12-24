import React from 'react';
import {Post} from '@domain/Post/entities';
import {Box} from '@components/Box';
import {Text} from '@components/Text';
import {useNavigation} from '@react-navigation/native';
export type PostBottomProps = Pick<
  Post,
  'author' | 'text' | 'commentCount' | 'id'
>;
export function PostBottom({author, text, commentCount, id}: PostBottomProps) {
  const navigation = useNavigation();
  const commentText = getCommentText(commentCount);
  function navigateToPostComment() {
    navigation.navigate('PostComment', {
      postId: Number(id),
      postAuthorId: author.id,
    });
  }

  return (
    <Box mt="s16">
      <Text preset="paragraphMedium" bold>
        {author.userName}
      </Text>
      <Text preset="paragraphMedium" color="gray1">
        {text}
      </Text>
      {commentText && (
        <Text
          onPress={navigateToPostComment}
          mt="s8"
          preset="paragraphSmall"
          bold
          color="primary">
          {commentText}
        </Text>
      )}
    </Box>
  );
}
function getCommentText(commentCount: number): string | null {
  if (commentCount === 0) {
    return null;
  } else if (commentCount === 1) {
    return 'ver comentário';
  } else {
    return `ver ${commentCount} comentários`;
  }
}
