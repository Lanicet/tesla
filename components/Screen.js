import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Theme from '../constants/Theme';

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight - 40,
    paddingBottom: Constants.statusBarHeight - 40,
    flex: 1,
    backgroundColor: Theme.COLORS.BACKGROUND,
  },
  view: {
    flex: 1,
    marginHorizontal: -2,
  },
});

export default Screen;
