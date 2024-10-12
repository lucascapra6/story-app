import React from 'react';

import {Text} from '@components/Text';
import {ActivityIndicator} from '@components/ActivityIndicator';
import {Button} from '@components/Button';
import {Box} from '@components/Box';

interface Props {
  loading: boolean;
  error: unknown;
  refetch: () => void;
}
export function EmptyComponent({loading, error, refetch}: Props) {
  let component = (
    <Text bold preset="paragraphMedium">
      Não há publicações no seu feed
    </Text>
  );

  if (loading) {
    component = <ActivityIndicator color="primary" />;
  }

  if (error) {
    component = (
      <>
        <Text bold preset="paragraphMedium" mb="s16">
          Não foi possível carregar o feed 😢
        </Text>
        <Button title="recarregar" preset="outline" onPress={refetch} />
      </>
    );
  }

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      {component}
    </Box>
  );
}
