import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    justifyContent: 'center',
    width: 300,
    height: 150,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  isSelected: {
    borderWidth: 10,
    borderColor: '#66bb6a'
  },
  appButtonText: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  input: {
    fontSize: 58,
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
