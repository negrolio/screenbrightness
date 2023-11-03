import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Brightness from 'expo-brightness';
import Slider from '@react-native-community/slider';

export default function App() {
  const [valueToSlider, setValueToSlider] = React.useState(1);
  const [maxSliderValue, setMaxSliderValue] = React.useState(1);
  const [minSliderValue, setMinSliderValue] = React.useState(0.95);
  const [currentButton, setCurrentButton] = React.useState(1);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(1);
      }
    })();
  }, []);

  const changeBrightness = async (value) => {
    await Brightness.setSystemBrightnessAsync(value);

    setValueToSlider(value);
  }

  const onPressLow = () => {
    setCurrentButton(0);

    changeBrightness(0.4);

    setMaxSliderValue(0.59);

    setMinSliderValue(0.4);
  }

  const onPressHigh = () => {
    setCurrentButton(1);

    changeBrightness(1);

    setMaxSliderValue(1);

    setMinSliderValue(0.94);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPressLow()} style={[styles.button, currentButton === 0 ? styles.isSelected : {} ]}>
        <Text style={styles.appButtonText}>Low</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPressHigh()} style={[styles.button, currentButton === 1 ? styles.isSelected : {} ]}>
        <Text style={styles.appButtonText}>High</Text>
      </TouchableOpacity>
      <View>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={minSliderValue}
          maximumValue={maxSliderValue}
          value={valueToSlider}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => changeBrightness(value)}
        />
        <Text>{valueToSlider}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});
