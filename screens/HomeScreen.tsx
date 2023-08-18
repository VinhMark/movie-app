import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR, SPACING } from '../theme/theme';
import InputHeader from '../components/InputHeader';
import { nowPlayingMovies, popularMovies, upcomingMovies } from '../api/apiCalls';
import { Movie } from '../utils/type';
import MovieList from '../components/MovieList';
import MovieTopList from '../components/MovieTopList';
import CategoryHeader from '../components/CategoryHeader';

const { width, height } = Dimensions.get('window');

const getNowPlayingList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong in getNowPlayingMoviesList function!', error);
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong in popularMoviesList function!', error);
  }
};

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong in upcomingMoviesList function!', error);
  }
};

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<Movie[]>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<Movie[]>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<Movie[]>(undefined);

  useEffect(() => {
    const startTime = performance.now();
    (async () => {
      let tempNowPlaying = await getNowPlayingList();
      setNowPlayingMoviesList([
        { key: 'left-space' },
        ...tempNowPlaying.results,
        { key: 'right-space' },
      ]);

      let tempPopularMoviesList = await getPopularMoviesList();
      setPopularMoviesList([...tempPopularMoviesList.results]);

      let tempUpcomingMoviesList = await getUpcomingMoviesList();
      setUpcomingMoviesList([...tempUpcomingMoviesList.results]);
    })();
    const endTime = performance.now();
    console.log('Time loading data : ', endTime - startTime);
  }, []);

  const handleSearch = (text: string) => {
    navigation.navigate('Search', { text });
  };

  if (!nowPlayingMoviesList && !popularMoviesList && !upcomingMoviesList) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <StatusBar hidden />

        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={handleSearch} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLOR.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={handleSearch} />
        </View>

        <View style={{ height: 30 }}></View>
        <MovieTopList navigation={navigation} movies={nowPlayingMoviesList} width={width} />

        <CategoryHeader title='Popular' />
        <MovieList navigation={navigation} movies={popularMoviesList} width={width / 3} />

        <CategoryHeader title='Upcoming' />
        <MovieList navigation={navigation} movies={upcomingMoviesList} width={width / 3} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.Black,
    height: '100%',
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
  },
});
