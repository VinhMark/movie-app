import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Movie } from '../utils/type';
import { baseImagePath } from '../api/apiCalls';
import { BORDER_RADIUS, COLOR, FONT_FAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface SubMovieCardProps {
  movie: Movie;
  cardFunction: () => void;
  shouldMarginateAtEnd?: boolean;
  shouldMarginateAround?: boolean;
  isFirst: boolean;
  isLast: boolean;
  cardWidth: number;
}

const SubMovieCard = ({
  movie,
  shouldMarginateAtEnd,
  shouldMarginateAround,
  isFirst,
  isLast,
  cardWidth,
  cardFunction,
}: SubMovieCardProps) => {
  return (
    <TouchableOpacity onPress={() => cardFunction()}>
      <View
        style={[
          styles.container,
          shouldMarginateAtEnd && isFirst
            ? { marginLeft: SPACING.space_36 }
            : isLast && { marginRight: SPACING.space_36 },
          ,
          shouldMarginateAround && { margin: SPACING.space_12 },
          { maxWidth: cardWidth },
        ]}
      >
        <Image
          source={{ uri: baseImagePath('w300', movie.poster_path) }}
          style={[styles.cardImage, { width: cardWidth }]}
        />
        <Text numberOfLines={1} style={styles.textTitle}>
          {movie.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubMovieCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDER_RADIUS.radius_20,
  },
  textTitle: {
    fontFamily: FONT_FAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
    paddingVertical: SPACING.space_10,
  },
});
