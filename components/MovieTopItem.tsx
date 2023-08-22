import { Image, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import React from 'react';
import { Movie } from '../utils/type';
import { baseImagePath } from '../api/apiCalls';
import { BORDER_RADIUS, COLOR, FONTSIZE, FONT_FAMILY, SPACING } from '../theme/theme';
import { AntDesign } from '@expo/vector-icons';
import { genres } from '../utils/data';

interface MovieTopItemProps {
  movie: Movie;
  cardFunction: () => void;
  shouldMarginateAtEnd: boolean;
  isFirst: boolean;
  isLast: boolean;
  cardWidth: number;
  translateY: any;
}

const MovieTopItem = ({
  movie,
  shouldMarginateAtEnd,
  isFirst,
  isLast,
  cardWidth,
  cardFunction,
  translateY,
}: MovieTopItemProps) => {
  return (
    <TouchableOpacity onPress={() => cardFunction()}>
      <View
        style={[
          styles.container,
          shouldMarginateAtEnd && isFirst
            ? { marginLeft: SPACING.space_36 }
            : isLast && { marginRight: SPACING.space_36 },
          ,
        ]}
      >
        <Animated.View style={{ maxWidth: cardWidth, transform: [{ scale: translateY }] }}>
          <Image
            source={{ uri: baseImagePath('w780', movie.poster_path) }}
            style={[styles.cardImage, { width: cardWidth }]}
          />

          <View>
            <View style={styles.rateContainer}>
              <AntDesign name='star' style={styles.starIcon} color={COLOR.Yellow} />
              <Text style={styles.textRate}>
                {movie.vote_average}({movie.vote_count.toLocaleString()})
              </Text>
            </View>

            <Text numberOfLines={1} style={styles.textTitle}>
              {movie.title}
            </Text>

            <View style={styles.genreContainer}>
              {movie.genre_ids.slice(0, 3).map((item: number, index: number) => (
                <View key={index} style={styles.genreBox}>
                  <Text style={styles.textGenre}>{genres[item]}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieTopItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.Black,
    paddingBottom: 5,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDER_RADIUS.radius_20,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLOR.WhiteRGBA32,
    borderRadius: BORDER_RADIUS.radius_8,
  },
  starIcon: {
    fontSize: FONTSIZE.size_18,
  },
  textRate: {
    color: COLOR.White,
    fontFamily: FONT_FAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    marginTop: 5,
  },
  textTitle: {
    fontFamily: FONT_FAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    color: COLOR.White,
    paddingVertical: SPACING.space_10,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.space_12,
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLOR.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDER_RADIUS.radius_20,
    alignItems: 'center',
  },
  textGenre: {
    color: COLOR.WhiteRGBA75,
    fontFamily: FONT_FAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
  },
});
