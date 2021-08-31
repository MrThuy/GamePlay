import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    height: 95,
    width: '100%',
    backgroundColor: theme.colors.secondary40,
    borderRadius: 8,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top'
  }
});