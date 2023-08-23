import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Ticket } from '../utils/type';
import { BORDER_RADIUS, COLOR, FONTSIZE, FONT_FAMILY, SPACING } from '../theme/theme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

const TicketScreen = ({ navigation, route }: any) => {
  const [ticketData, setTicketData] = useState<Ticket>(route.params);
  const [loading, setLoading] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const ticket = await SecureStore.getItemAsync('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  console.log(ticketData);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={COLOR.Orange} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {!ticketData ? (
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text
              style={{
                color: COLOR.WhiteRGBA50,
                fontFamily: FONT_FAMILY.poppins_medium,
                fontSize: FONTSIZE.size_20,
                textAlign: 'center',
              }}
            >
              No Ticket
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.appHeaderContainer}>
              <AppHeader header='My Ticket' action={() => navigation.goBack()} />
            </View>

            <View style={styles.ticketContainer}>
              <ImageBackground source={{ uri: ticketData.ticketImage }} style={styles.ticketImage}>
                <LinearGradient
                  colors={[COLOR.OrangeRGBA0, COLOR.Orange]}
                  style={styles.linearGradient}
                >
                  <CircleBox style={{ left: -30, bottom: -30 }} />
                  <CircleBox style={{ right: -30, bottom: -30 }} />
                </LinearGradient>
              </ImageBackground>

              <View style={styles.linear}></View>

              <View style={styles.ticketFooter}>
                <CircleBox style={{ left: -30, top: -30 }} />
                <CircleBox style={{ right: -30, top: -30 }} />
                <View style={styles.ticketDateContainer}>
                  <View style={styles.ticketDateBox}>
                    <Text style={styles.dateTitle}>{ticketData.date.date}</Text>
                    <Text style={styles.subTitle}>{ticketData.date.day}</Text>
                  </View>
                  <View style={styles.ticketTimeBox}>
                    <AntDesign
                      name='clockcircleo'
                      size={FONTSIZE.size_24}
                      style={styles.iconClock}
                      color={COLOR.White}
                    />
                    <Text style={styles.subTitle}>{ticketData.time}</Text>
                  </View>
                </View>

                {/* Seat info */}
                <View
                  style={[
                    styles.ticketDateContainer,
                    { marginTop: 2, marginBottom: SPACING.space_15 },
                  ]}
                >
                  <View style={styles.ticketDateBox}>
                    <Text style={styles.seatTitle}>Hall</Text>
                    <Text style={styles.subTitle}>04</Text>
                  </View>
                  <View style={styles.ticketDateBox}>
                    <Text style={styles.seatTitle}>Row</Text>
                    <Text style={styles.subTitle}>02</Text>
                  </View>
                  <View style={styles.ticketDateBox}>
                    <Text style={styles.seatTitle}>Seats</Text>
                    <Text style={styles.subTitle}>{ticketData.seatArray}</Text>
                  </View>
                </View>

                {/* Bar Code */}
                <View style={styles.barcode}>
                  <Image
                    style={{ aspectRatio: 158 / 52 }}
                    source={require('../assets/images/barcode.png')}
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const CircleBox = ({ style }) => {
  return (
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: COLOR.Black,
        position: 'absolute',
        ...style,
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_12,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 300,
    overflow: 'hidden',
  },
  ticketImage: {
    width: 300,
    borderTopLeftRadius: BORDER_RADIUS.radius_25,
    borderTopRightRadius: BORDER_RADIUS.radius_25,
    overflow: 'hidden',
    alignSelf: 'center',
    aspectRatio: 200 / 300,
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },
  linear: {
    borderTopColor: COLOR.Black,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: COLOR.Orange,
  },
  ticketFooter: {
    backgroundColor: COLOR.Orange,
    borderBottomLeftRadius: BORDER_RADIUS.radius_25,
    borderBottomRightRadius: BORDER_RADIUS.radius_25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // gap: 40,
    marginTop: SPACING.space_10,
  },
  ticketDateBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ticketTimeBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTitle: {
    color: COLOR.White,
    fontFamily: FONT_FAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    paddingVertical: 1,
    marginBottom: -3,
    lineHeight: 30,
  },
  iconClock: {
    marginBottom: 5,
  },
  subTitle: {
    color: COLOR.White,
    fontFamily: FONT_FAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
  seatTitle: {
    color: COLOR.White,
    fontFamily: FONT_FAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    paddingVertical: 1,
    marginBottom: -3,
    lineHeight: 30,
  },
  barcode: {
    alignItems: 'center',
    marginBottom: SPACING.space_15,
  },
});

export default TicketScreen;
