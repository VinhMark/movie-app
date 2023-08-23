import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BORDER_RADIUS, COLOR, FONTSIZE, FONT_FAMILY, SPACING } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import { baseImagePath } from '../api/apiCalls';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';

const timeArray: string[] = ['10:30', '12:30', '14:30', '15:00', '19:30', '21:30'];

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }

  return weekdays;
};

const generateSeat = () => {
  let numRow = 8;
  let numColumn = 3;
  let rows = [];
  let start = 1;
  let reachNine = false;

  for (let i = 0; i < numRow; i++) {
    let columns = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columns.push(seatObject);
      start++;
    }

    if (i === 3) {
      numColumn += 2;
    }

    if (numColumn < 9 && !reachNine) {
      numColumn += 2;
    } else {
      reachNine = true;
      numColumn -= 2;
    }
    rows.push(columns);
  }

  return rows;
};

const SeatBookingScreen = ({ navigation, route }: any) => {
  const [dateArray, setDateArray] = useState<any>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeat());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [price, setPrice] = useState<number>(0);

  const insets = useSafeAreaInsets();

  const selectSeat = (index: number, subIndex: number, num: number) => {
    if (!twoDSeatArray[index][subIndex].taken) {
      let array = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subIndex].selected = !temp[index][subIndex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(num);
        if (tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  const handleBoolSeat = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] &&
      dateArray[selectedDateIndex]
    ) {
      try {
        await SecureStore.setItemAsync(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: baseImagePath('w400', route.params.posterImage),
          })
        );

        navigation.navigate('Ticket', {
          seatArray: selectedSeatArray,
          time: timeArray[selectedTimeIndex],
          date: dateArray[selectedDateIndex],
          ticketImage: baseImagePath('w400', route.params.posterImage),
        });
      } catch (error) {
        console.log(error);
        ToastAndroid.show('Something went wrong save ticket!', 5);
      }
    } else {
      const error = `Please check: ${selectedSeatArray.length === 0 ? 'Seat, ' : ''}${
        !selectedDateIndex ? 'Date, ' : ''
      }${!selectedTimeIndex ? 'Time' : ''} `;
      ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.TOP);
    }
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']}>
      <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={'transparent'} style='inverted' />
        <ImageBackground
          source={{ uri: baseImagePath('w500', route.params?.bgImage) }}
          style={styles.bgImage}
        >
          <LinearGradient colors={[COLOR.BlackRGB10, COLOR.Black]} style={styles.linearGradient}>
            <View style={[styles.appHeaderContainer, { paddingTop: insets.top }]}>
              <AppHeader header='' action={() => navigation.goBack()} />
            </View>
          </LinearGradient>
        </ImageBackground>

        <Text style={styles.screenText}>Screen this side</Text>

        <View style={styles.seatContainer}>
          <View style={styles.containerGap20}>
            {twoDSeatArray.map((item, index) => (
              <View key={index} style={styles.seatRow}>
                {item?.map((subItem, subIndex) => (
                  <TouchableOpacity
                    disabled={subItem.taken}
                    key={`${index}-${subIndex}`}
                    onPress={() => {
                      selectSeat(index, subIndex, subItem.number);
                    }}
                  >
                    <MaterialIcons
                      name='event-seat'
                      size={FONTSIZE.size_24}
                      color={COLOR.White}
                      style={[
                        subItem.taken && { color: COLOR.WhiteRGBA32 },
                        subItem.selected && { color: COLOR.Orange },
                      ]}
                    />
                    <Text
                      style={{ color: 'white', fontSize: FONTSIZE.size_10, textAlign: 'center' }}
                    >
                      {index}-{subIndex}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Genre */}
        <View style={styles.genreContainer}>
          <View style={styles.genreItem}>
            <FontAwesome5 name='dot-circle' size={FONTSIZE.size_20} color={COLOR.White} />
            <Text style={styles.genreText}>Available</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <FontAwesome5 name='dot-circle' size={FONTSIZE.size_20} color={COLOR.WhiteRGBA32} />
            <Text style={styles.genreText}>Taken</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <FontAwesome5 name='dot-circle' size={FONTSIZE.size_20} color={COLOR.Orange} />
            <Text style={styles.genreText}>Selected</Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.dateContainer}>
          <FlatList
            data={dateArray}
            keyExtractor={(item) => item.date}
            snapToInterval={67}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: SPACING.space_10 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDateIndex(index);
                }}
                style={[
                  styles.dateItem,
                  selectedDateIndex === index && { backgroundColor: COLOR.Orange },
                ]}
              >
                <Text style={styles.dateText} numberOfLines={1}>
                  {item.date}
                </Text>

                <Text style={styles.dayText}>{item.day}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* Time */}
        <View style={styles.timeContainer}>
          <FlatList
            data={timeArray}
            keyExtractor={(item) => item}
            snapToInterval={67}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: SPACING.space_10 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => setSelectedTimeIndex(index)}
                style={[
                  styles.timeItem,
                  selectedTimeIndex === index && {
                    backgroundColor: COLOR.Orange,
                    borderColor: COLOR.Orange,
                  },
                ]}
              >
                <Text
                  style={[styles.timeText, selectedTimeIndex === index && { color: COLOR.White }]}
                  numberOfLines={1}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* bottom */}
        <View style={styles.bottomContainer}>
          <View style={{}}>
            <Text style={styles.labelPrice}>Total price</Text>
            <Text style={styles.priceText}>$ {price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity onPress={() => handleBoolSeat()} style={styles.btnBuy}>
            <Text style={styles.textBtnBuy}>Buy Tickets</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.Black,
  },
  bgImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: BORDER_RADIUS.radius_15,
    borderTopRightRadius: BORDER_RADIUS.radius_15,
    overflow: 'hidden',
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_12,
  },
  screenText: {
    color: COLOR.WhiteRGBA50,
    textAlign: 'center',
    fontSize: FONTSIZE.size_12,
    fontFamily: FONT_FAMILY.poppins_regular,
  },
  seatContainer: {
    marginTop: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_8,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.space_18,
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginTop: 30,
  },
  genreItem: {
    flexDirection: 'row',
    gap: 3,
  },
  genreText: {
    color: 'white',
    fontFamily: FONT_FAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
  dateContainer: {
    marginHorizontal: SPACING.space_20,
  },
  dateItem: {
    marginTop: SPACING.space_16,
    width: 57,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    backgroundColor: COLOR.WhiteRGBA15,
  },
  dateText: {
    color: COLOR.White,
    fontFamily: FONT_FAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
  },
  dayText: {
    color: COLOR.White,
    fontFamily: FONT_FAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    lineHeight: 13,
    marginTop: -3,
  },
  timeContainer: {
    marginHorizontal: SPACING.space_20,
  },
  timeItem: {
    borderWidth: 1,
    borderColor: COLOR.WhiteRGBA50,
    marginTop: SPACING.space_16,
    borderRadius: 32,
    width: 78,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B0B0B',
  },
  timeText: {
    color: COLOR.WhiteRGBA50,
    fontFamily: FONT_FAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    marginTop: 2,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 60,
    marginTop: 60,
  },
  labelPrice: {
    color: COLOR.WhiteRGBA50,
    fontSize: FONTSIZE.size_14,
  },
  priceText: {
    color: COLOR.White,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONT_FAMILY.poppins_medium,
  },
  btnBuy: {
    backgroundColor: COLOR.Orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.radius_25,
    height: 46,
    width: 165,
  },
  textBtnBuy: {
    fontFamily: FONT_FAMILY.poppins_bold,
    fontSize: FONTSIZE.size_16,
    color: COLOR.White,
    marginTop: 2,
  },
});
