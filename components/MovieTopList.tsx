import { FlatList, StyleSheet, View, Animated, Text } from 'react-native';
import React, { useRef } from 'react';
import { Movie } from '../utils/type';
import { SPACING } from '../theme/theme';
import MovieTopItem from './MovieTopItem';

interface MovieTopListProps {
  movies: Movie[];
  width: number;
  navigation: any;
}

const MovieTopList = ({ movies, width, navigation }: MovieTopListProps) => {
  const scrollX = useRef(new Animated.Value(1)).current;
  const ITEM_SIZE: number = width * 0.7;

  return (
    <Animated.FlatList
      data={movies}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: true,
      })}
      scrollEventThrottle={16}
      horizontal
      keyExtractor={(item: any) => item.id || item.key}
      contentContainerStyle={styles.containerGap36}
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_SIZE + SPACING.space_36}
      decelerationRate={0}
      renderItem={({ item, index }) => {
        if (item.key) {
          const widthItem = (width - (ITEM_SIZE + SPACING.space_36 * 2)) / 2;
          return <View key={item.key} style={{ width: widthItem }}></View>;
        }

        const translateY = scrollX.interpolate({
          inputRange: [
            (index - 2) * (ITEM_SIZE + SPACING.space_36),
            (index - 1) * (ITEM_SIZE + SPACING.space_36),
            index * (ITEM_SIZE + SPACING.space_36),
          ],
          outputRange: [0.9, 1, 0.9],
        });

        // return <Text style={{ color: 'white' }}>{item.id}</Text>;

        return (
          <MovieTopItem
            key={item.id}
            translateY={translateY}
            movie={item}
            cardFunction={() => navigation.push('MovieDetails', { id: item.id })}
            cardWidth={ITEM_SIZE}
            isFirst={index === 0}
            isLast={index === movies.length - 1}
            shouldMarginateAtEnd={true}
          />
        );
      }}
    />
  );
};

export default MovieTopList;

const styles = StyleSheet.create({
  containerGap36: {
    gap: SPACING.space_36,
  },
});
