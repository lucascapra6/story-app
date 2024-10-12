import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Screen} from '@components/Screen';
import {AppTabScreenProps} from '@routes/navigationProps';
import {Animated, ListRenderItemInfo, StyleSheet} from 'react-native';
import {Post} from '@domain/Post/entities';
import {postListMock} from '@domain/Post/mock';
import {PostItem} from '@components/Post';
import {HomeHeader} from '@components/HomeHeader';
import {Box} from '@components/Box';

export function StickyNavbarExample() {
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    setPostList(postListMock);
  }, []);

  const renderItem = useCallback(({item}: ListRenderItemInfo<Post>) => {
    return <PostItem post={{...item}} />;
  }, []);
  const HEADER_MAX_HEIGHT = 120;
  const {diffClamp} = Animated;
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollYCampled = diffClamp(scrollY, 0, HEADER_MAX_HEIGHT);

  const translateY = scrollYCampled.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [0, -(HEADER_MAX_HEIGHT / 2)],
  });

  const animatedEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}], //pega o valor da posicao do eixo y e atribui ao animatedValue scrollY
    {useNativeDriver: false}, // useNativeDriver não pode ser true ao animar altura
  );

  const onScrollHandler = (event: any) => {
    // Chame primeiro o evento animado para atualizar scrollY
    animatedEvent(event);
  };

  return (
    <Screen style={style.screenContainer}>
      <Animated.View
        style={[
          styles.header,
          {height: HEADER_MAX_HEIGHT, transform: [{translateY}]},
        ]}>
        <HomeHeader />
      </Animated.View>
      <Box>
        <Animated.FlatList
          data={postList}
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          keyExtractor={item => item.id}
          scrollEventThrottle={16}
          onScroll={onScrollHandler}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Screen>
  );
}

const style = StyleSheet.create({
  screenContainer: {
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Garante que o header fique sobre a FlatList
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
