import { View, ScrollView, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR, SPACING } from '../theme/theme';
import { Cast, Movie } from '../utils/type';
import { movieCastDetails, movieDetails } from '../api/apiCalls';
import AppHeader from '../components/AppHeader';
import { StatusBar } from 'expo-status-bar';
import { baseImagePath } from './../api/apiCalls';

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
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [movieCast, setMovieCast] = useState<Cast | undefined>(undefined);

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
    // <SafeAreaView>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.container}>
        <StatusBar hidden />
        {/* <View style={styles.appHeaderContainer}>
          <AppHeader movie={movie} header='' action={() => navigation.goBack()} />
        </View> */}

        <View>
          <ImageBackground
            source={{
              uri: baseImagePath('w780', movie?.backdrop_path),
            }}
            style={styles.imgBackground}
          ></ImageBackground>
        </View>
      </ScrollView>
    // </SafeAreaView>
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
    aspectRatio: 16 / 9,
  },
});

export default MovieDetailsScreen;
