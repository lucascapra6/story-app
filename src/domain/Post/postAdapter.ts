import {Post, PostApi} from '@domain/Post/entities';

export function toPost(postApi: PostApi): Post {
  return {
    id: String(postApi.id),
    text: postApi.text,
    author: {
      profileURL: postApi.user.profile_url,
      name: postApi.user.first_name,
      userName: postApi.user.username,
    },
    imageURL: postApi.image_url,
    reactionCount: Number(postApi.meta.like_count),
    commentCount: Number(postApi.meta.comments_count),
    favoriteCount: Number(postApi.meta.favorite_count),
  };
}
export const postAdapter = {
  toPost,
};
