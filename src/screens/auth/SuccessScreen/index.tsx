import React from 'react';
import {Screen} from '@components/Screen';
import {Icon} from '@components/Icon';
import {Text} from '@components/Text';
import {Button} from '@components/Button';
import {AuthRoutes} from '@routes/navigationProps';
export function SuccessScreen({
  route,
  navigation,
}: AuthRoutes<'SuccessScreen'>) {
  function goBackToBegin() {
    navigation.goBack();
  }
  return (
    <Screen>
      <Icon {...route.params.icon} />
      <Text preset="headingLarge" mt="s24">
        {route.params.title}
      </Text>
      <Text preset="paragraphLarge" mt="s16">
        {route.params.description}
      </Text>
      <Button onPress={goBackToBegin} title="Voltar ao início" mt="s40" />
    </Screen>
  );
}
