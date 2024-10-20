import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {usePostCommentCreate} from '@domain/PostComment/useCases/usePostCommentCreate';
import {TextMessage} from '@components/TextMessage/TextMessage';
interface Props {
  postId: number;
  onAddComment: () => void;
}
export function PostCommentTextMessage({postId, onAddComment}: Props) {
  const [message, setMessage] = useState('');
  const {createComment} = usePostCommentCreate(postId, {
    onSuccess: () => {
      onAddComment();
      setMessage('');
      Keyboard.dismiss();
    },
  });
  return (
    <TextMessage
      placeholder="Adicione um comentário"
      onPressSend={createComment}
      value={message}
      onChangeText={setMessage}
    />
  );
}
