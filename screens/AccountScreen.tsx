import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR, FONTSIZE, FONT_FAMILY, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import Setting from '../components/Setting';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const AccountScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.appHeaderContainer}>
          <AppHeader header='My Profile' action={() => navigation.goBack()} />
        </View>

        <View style={styles.profileContainer}>
          <Image style={styles.avatarImg} source={require('../assets/images/avatar.png')} />
          <Text style={styles.fullName}>John Doe</Text>
        </View>

        <View style={styles.profileContainer}>
          <Setting
            icon={<Feather name='user' size={18} color='white' />}
            header='Account'
            subHeader='Edit Profile'
            subTitle='Change Password'
          />
          <Setting
            icon={<MaterialIcons name='settings' size={18} color='white' />}
            header='Settings'
            subHeader='Themes'
            subTitle='Permissions'
          />
          <Setting
            icon={<MaterialIcons name='attach-money' size={18} color='white' />}
            header='Offers & Referrals'
            subHeader='Offers'
            subTitle='Referrals'
          />
          <Setting
            icon={<MaterialCommunityIcons name='information-outline' size={18} color='white' />}
            header='About'
            subHeader='About Movies'
            subTitle='More'
          />
        </View>
      </View>
    </SafeAreaView>
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
  profileContainer: {
    marginTop: 40,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginBottom: SPACING.space_12,
  },
  fullName: {
    color: COLOR.White,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONT_FAMILY.poppins_medium,
  },
});

export default AccountScreen;
