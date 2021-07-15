import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    height: 95,
    width: '100%',
    backgroundColor: theme.colors.secondary40,
    borderRadius: 8,
    color: theme.colors.heading,
    textAlign: 'center',
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    marginLeft: 4,
  }
});