import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { Movie } from '../utils/type';
import SubMovieCard from './SubMovieCard';
import { SPACING } from '../theme/theme';

interface MovieListProps {
  movies: Movie[];
  width: number;
  navigation: any;
}

const MovieList = ({ movies, width, navigation }: MovieListProps) => {
  return (
    <FlatList
      data={movies}
      horizontal
      keyExtractor={(item: any) => item.id}
      contentContainerStyle={styles.containerGap36}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <SubMovieCard
          movie={item}
          cardFunction={() => navigation.push('MovieDetails', { id: item.id })}
          cardWidth={width}
          isFirst={index === 0}
          isLast={index === movies.length - 1}
          shouldMarginateAtEnd={true}
        />
      )}
    />
  );
};

export default MovieList;

const styles = StyleSheet.create({
  containerGap36: {
    gap: SPACING.space_32,
  },
});
