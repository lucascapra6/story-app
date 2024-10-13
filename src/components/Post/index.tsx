import React from 'react';
import {Post} from '@domain/Post/entities';
import {Box} from '@components/Box';
import {PostHeader} from '@components/Post/PostHeader';
import {PostImage} from '@components/Post/PostImage';
import {PostActions} from '@components/Post/PostActions';
import {PostBottom} from '@components/Post/PostBottom';
interface Props {
  post: Post;
}
export function PostItem({post}: Props) {
  return (
    <Box marginBottom="s24" paddingHorizontal="s24">
      <PostHeader author={post.author} />
      <PostImage imageURL={post.imageURL} />
      <PostActions
        commentCount={post.commentCount}
        favoriteCount={post.favoriteCount}
        reactionCount={post.reactionCount}
      />
      <PostBottom
        author={post.author}
        text={post.text}
        commentCount={post.commentCount}
        id={post.id}
      />
    </Box>
  );
}
