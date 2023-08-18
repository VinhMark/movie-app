import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR, SPACING } from '../theme/theme';
import { Movie } from '../utils/type';
import InputHeader from '../components/InputHeader';
import { searchMovies } from '../api/apiCalls';
import SubMovieCard from '../components/SubMovieCard';

const { width, height } = Dimensions.get('screen');

const SearchScreen = ({ route, navigation }: any) => {
  const [searchList, setSearchList] = useState<Movie[]>([]);

  const handleSearchMovies = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.error('Something went wrong in search movies');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={handleSearchMovies} searchParams={route.params?.text} />
        </View>

        <FlatList
          data={searchList}
          ListHeaderComponent={
            searchList.length && (
              <Text style={styles.textResult}>{searchList.length.toLocaleString()} results.</Text>
            )
          }
          numColumns={2}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <SubMovieCard
              movie={item}
              cardFunction={() => navigation.push('MovieDetails')}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              isFirst={index === 0}
              isLast={index === searchList.length - 1}
              shouldMarginateAtEnd={false}
              shouldMarginateAround={true}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.Black,
    alignItems: 'center',
    width,
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  textResult: {
    color: COLOR.WhiteRGBA75,
    marginVertical: SPACING.space_10,
    marginHorizontal: SPACING.space_12,
  },
});

export default SearchScreen;
