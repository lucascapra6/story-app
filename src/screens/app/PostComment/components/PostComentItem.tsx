import React from 'react';
import {Box} from '@components/Box';
import {PostComment} from '@domain/PostComment/entities';
import {Text} from '@components/Text';
import {ProfileAvatar} from '@components/ProfileAvatar';
import {dateUtils} from '../../../../utils/dateUtils';
interface Props {
  postComment: PostComment;
}
export function PostCommentItem({postComment}: Props) {
  return (
    <Box flexDirection="row" alignItems="center" mb="s16">
      <ProfileAvatar imageURL={postComment.author.profileURL} />
      <Box ml="s12" flex={1}>
        <Text preset="paragraphSmall" bold>
          {postComment.author.userName}
        </Text>
        <Text preset="paragraphSmall" color="gray1">
          {postComment.message}
        </Text>
        <Text preset="paragraphSmall" color="gray1">
          {postComment.createdAtRelative}
        </Text>
      </Box>
    </Box>
  );
}
