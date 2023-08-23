import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BORDER_RADIUS, COLOR, FONTSIZE, FONT_FAMILY, SPACING } from '../theme/theme';
import { Cast, MovieDetail } from '../utils/type';
import { movieCastDetails, movieDetails } from '../api/apiCalls';
import AppHeader from '../components/AppHeader';
import { baseImagePath } from './../api/apiCalls';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { Genres } from '../utils/type';
import CategoryHeader from '../components/CategoryHeader';
import { StatusBar } from 'expo-status-bar';

const getMovie = async (id: number) => {
  try {
    const response = await fetch(movieDetails(id));
    const json = await response.json();

    return json;
  } catch (error) {
    console.error('Something went wrong in get movie detail function', error);
  }
};

const getMovieCast = async (id: number) => {
  try {
    const response = await fetch(movieCastDetails(id));
    const json = await response.json();

    return json;
  } catch (error) {
    console.error('Something went wrong in get movie cast detail function', error);
  }
};

const MovieDetailsScreen = ({ navigation, route }) => {
  const [movie, setMovie] = useState<MovieDetail | undefined>(undefined);
  const [movieCast, setMovieCast] = useState<Cast[] | undefined>(undefined);
  const insets = useSafeAreaInsets();

  const toHourAndMinute = (time: number): string => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    (async () => {
      const tempMovie = await getMovie(route.params?.id);
      setMovie(tempMovie);

      const tempCastOfMovie = await getMovieCast(route.params?.id);
      setMovieCast(tempCastOfMovie.cast);
    })();
  }, []);

  if (!movie || !movieCast) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} color={COLOR.Orange} />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.container}>
        <StatusBar backgroundColor={'transparent'} style='inverted' />
        <View>
          <ImageBackground
            source={{
              uri: baseImagePath('w780', movie?.backdrop_path),
            }}
            style={styles.imgBackground}
          >
            <LinearGradient colors={[COLOR.BlackRGB10, COLOR.Black]} style={styles.linearGradient}>
              <View style={[styles.appHeaderContainer, { paddingTop: insets.top }]}>
                <AppHeader header={movie.title} action={() => navigation.goBack()} />
              </View>
            </LinearGradient>
          </ImageBackground>

          <View style={styles.imgBackground}>
            <Image
              source={{ uri: baseImagePath('w400', movie?.poster_path) }}
              style={styles.cardImage}
            />
          </View>

          {/* Times */}
          <View style={styles.timeContainer}>
            <AntDesign name='clockcircleo' size={FONTSIZE.size_18} color={COLOR.WhiteRGBA50} />
            <Text style={styles.textTime}>{toHourAndMinute(movie.runtime)}</Text>
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.textTitle}>{movie.title}</Text>

            <View style={styles.genreContainer}>
              {movie.genres.map((item: Genres, index: number) => (
                <Text style={styles.textGenre} key={index}>
                  {item.name}
                </Text>
              ))}
            </View>

            <Text style={styles.tagline} numberOfLines={1}>
              {movie.tagline}
            </Text>

            <View style={styles.voteAndDateContainer}>
              <View style={styles.voteContainer}>
                <AntDesign name='star' style={styles.starIcon} color={COLOR.Yellow} />
                <Text style={styles.textRate}>
                  {movie.vote_average}({movie.vote_count.toLocaleString()})
                </Text>
              </View>
              {/* date */}
              <Text style={styles.textDate} numberOfLines={1}>
                {new Date(movie.release_date).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </Text>
            </View>

            {/* Description */}
            <Text style={styles.textOverview}>{movie.overview}</Text>
          </View>

          {/* Cast */}
          <View>
            <CategoryHeader title='Top Cast' />

            <FlatList
              data={movieCast}
              horizontal
              keyExtractor={(item: any) => item.id}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: SPACING.space_24 }}
              style={styles.castContainer}
              renderItem={({ item }) => (
                <View style={styles.castItem}>
                  <Image
                    source={{ uri: baseImagePath('w400', item.profile_path) }}
                    style={styles.castImg}
                  />
                  <Text style={styles.castText} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
              )}
            />
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={() => {
              navigation.push('SeatBooking', {
                bgImage: movie.backdrop_path,
                posterImage: movie.poster_path,
              });
            }}
            style={styles.buttonSelect}
          >
            <Text style={styles.textSelect} numberOfLines={1}>
              Select Seats
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.Black,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_12,
  },
  imgBackground: {
    width: '100%',
    aspectRatio: 21 / 12,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: 236,
    height: 353,
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderRadius: BORDER_RADIUS.radius_20,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginVertical: 15,
  },
  textTime: {
    color: COLOR.White,
    fontFamily: FONT_FAMILY.poppins_regular,
    marginTop: 2,
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  textTitle: {
    fontSize: FONTSIZE.size_24,
    color: COLOR.White,
    fontFamily: FONT_FAMILY.poppins_regular,
    textAlign: 'center',
    lineHeight: 26,
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 21,
    marginVertical: 15,
  },
  textGenre: {
    fontSize: FONTSIZE.size_10,
    color: COLOR.WhiteRGBA75,
    borderWidth: 1,
    borderColor: COLOR.WhiteRGBA75,
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDER_RADIUS.radius_15,
  },
  tagline: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONT_FAMILY.poppins_regular,
    color: COLOR.White,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  voteAndDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    marginTop: SPACING.space_12,
  },
  voteContainer: {
    flexDirection: 'row',
    gap: SPACING.space_4,
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
  },
  textRate: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONT_FAMILY.poppins_regular,
    color: COLOR.White,
    marginTop: 2,
  },
  textDate: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONT_FAMILY.poppins_regular,
    fontWeight: '500',
    color: COLOR.White,
    textAlign: 'center',
  },
  textOverview: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONT_FAMILY.poppins_regular,
    color: COLOR.White,
    marginTop: SPACING.space_10,
    lineHeight: 20,
  },
  castContainer: {
    marginHorizontal: SPACING.space_24,
  },
  castItem: {
    maxWidth: 75,
  },
  castImg: {
    width: 75,
    height: 100,
    borderRadius: BORDER_RADIUS.radius_25,
  },
  castText: {
    color: COLOR.White,
    fontSize: FONTSIZE.size_12,
  },
  buttonSelect: {
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_15,
    backgroundColor: COLOR.Orange,
    width: 125,
    borderRadius: BORDER_RADIUS.radius_20,
    alignSelf: 'center',
  },
  textSelect: {
    color: COLOR.White,
    fontSize: FONTSIZE.size_12,
    paddingHorizontal: SPACING.space_28,
    paddingVertical: SPACING.space_8,
  },
});

export default MovieDetailsScreen;
