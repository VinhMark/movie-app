import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BORDER_RADIUS, COLOR, FONTSIZE, SPACING } from '../theme/theme';
import { Octicons } from '@expo/vector-icons';

interface InputHeaderProps {
  searchFunction: (text: string) => void;
  searchParams?: string | null;
}

const InputHeader = ({ searchFunction, searchParams }: InputHeaderProps) => {
  const [searchText, setSearchText] = useState<string>(searchParams || '');

  useEffect(() => {
    if (searchParams) {
      setSearchText(searchParams);
      searchFunction(searchParams);
    }
  }, [searchParams]);

  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        placeholder='Search your Movies...'
        placeholderTextColor={COLOR.WhiteRGBA32}
        onChangeText={(textInput) => setSearchText(textInput)}
        value={searchText}
      />
      <TouchableOpacity style={styles.buttonSearch} onPress={() => searchFunction(searchText)}>
        <Octicons name='search' color={COLOR.Orange} size={FONTSIZE.size_20} />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;

const styles = StyleSheet.create({
  inputBox: {
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLOR.WhiteRGBA15,
    borderRadius: BORDER_RADIUS.radius_15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    color: COLOR.White,
    width: '90%',
  },
  buttonSearch: {
    width: '10%',
    alignItems: 'flex-end',
  },
});
