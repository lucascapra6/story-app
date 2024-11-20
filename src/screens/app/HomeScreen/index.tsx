import React, {useCallback, useEffect} from 'react';
import {Screen} from '@components/Screen';
import {
  Animated,
  ListRenderItemInfo,
  Platform,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {Post} from '@domain/Post/entities';
import {PostItem} from '@components/Post';
import {HomeHeader} from '@components/HomeHeader';
import {EmptyComponent} from '@components/EmptyComponent';
import {usePostList} from '@domain/Post/useCases/usePostList';
import {ActivityIndicator} from '@components/ActivityIndicator';
import {StickyHeaderWrapper} from '@components/StickyHeaderWrapper';
import {useStickyHeaderWrapper} from '@components/StickyHeaderWrapper/useStickyHeaderWrapper';
import {AppTabScreenProps} from '@routes/navigationProps';
const headerHeight = Platform.OS === 'android' ? 70 : 110;
export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const {list, isError, isLoading, hasNextPage, refresh, fetchNextPage} =
    usePostList();

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = useCallback(({item}: ListRenderItemInfo<Post>) => {
    return <PostItem post={{...item}} />;
  }, []);

  const {scrollY, handleScroll} = useStickyHeaderWrapper();

  return (
    <Screen style={style.screenContainer}>
      <StickyHeaderWrapper scrollY={scrollY} headerHeight={headerHeight}>
        <HomeHeader />
      </StickyHeaderWrapper>
      <Animated.FlatList
        bounces={false}
        data={list}
        keyExtractor={item => item.id.toString()}
        scrollEventThrottle={16}
        onEndReached={fetchNextPage}
        onScroll={handleScroll}
        onEndReachedThreshold={0.3}
        initialNumToRender={5}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
        renderItem={renderItem}
        contentContainerStyle={{flexGrow: 1, paddingTop: headerHeight}}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          hasNextPage ? (
            <ActivityIndicator color={'primary'} size="large" />
          ) : null
        }
        ListEmptyComponent={
          <EmptyComponent
            loading={isLoading}
            error={isError}
            refetch={refresh}
          />
        }
      />
    </Screen>
  );
}

const style = StyleSheet.create({
  screenContainer: {
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    flex: 1,
  },
  header: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
});

export const getCloser = (value: number, checkOne: number, checkTwo: number) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;
