import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import * as Brightness from 'expo-brightness';
import Slider from '@react-native-community/slider';
import { styles } from './styles';

export default function App() {
  const [page, setPage] = React.useState(0);
  const [valueToSlider, setValueToSlider] = React.useState(1);
  const [maxSliderValue, setMaxSliderValue] = React.useState(1);
  const [minSliderValue, setMinSliderValue] = React.useState(0.95);
  const [currentButton, setCurrentButton] = React.useState(1);
  const [inputValue, setInputValue] = React.useState();

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

    setMaxSliderValue(0.5);

    setMinSliderValue(0.3);

    setInputValue(undefined)
  }

  const onPressHigh = () => {
    setCurrentButton(1);

    changeBrightness(1);

    setMaxSliderValue(1);

    setMinSliderValue(0.94);

    setInputValue(undefined)
  }

  const onPressCustom = () => {
    setPage(1);

    setCurrentButton(2);

    changeBrightness(1);
  }

  const onPressDoIt = () => {
    if (!inputValue) {
      return setPage(0);
    }
    const parsedValue = Number(`0.${inputValue}`)

    changeBrightness(parsedValue);

    setMinSliderValue(parsedValue - 0.05);

    setMaxSliderValue(parsedValue + 0.1);

    setPage(0);
  }

  return (
    <View style={styles.container}>
      {page === 0 && (
        <>
          <TouchableOpacity onPress={onPressLow} style={[styles.button, currentButton === 0 ? styles.isSelected : {} ]}>
            <Text style={styles.appButtonText}>Low</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressHigh} style={[styles.button, currentButton === 1 ? styles.isSelected : {} ]}>
            <Text style={styles.appButtonText}>High</Text>
          </TouchableOpacity>

          <View>
            <Slider
              style={{ width: 300, height: 40 }}
              minimumValue={minSliderValue}
              maximumValue={maxSliderValue}
              value={valueToSlider}
              minimumTrackTintColor="red"
              maximumTrackTintColor="green"
              thumbStyle={{ width: 30, height: 300, backgroundColor: 'blue' }}
              onValueChange={(value) => changeBrightness(value)}
            />
            <Text>{valueToSlider}</Text>
          </View>

          <TouchableOpacity onPress={onPressCustom} style={[styles.button, currentButton === 2 ? styles.isSelected : {} ]}>
            <Text style={styles.appButtonText}>{inputValue || 'Custom'}</Text>
          </TouchableOpacity>
        </>
      )}


      {page === 1 && (
        <>
          <TextInput
            editable
            multiline
            inputmode='numeric'
            keyboardType='numeric'
            numberOfLines={4}
            maxLength={40}
            onChangeText={val => setInputValue(val)}
            value={inputValue}
            style={styles.input}
          />
          <TouchableOpacity onPress={onPressDoIt} style={styles.button}>
            <Text style={styles.appButtonText}>Do it</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
