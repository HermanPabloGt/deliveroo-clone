import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate("Delivery");
      }, 4000);
    }, [])
    
  return (
    <SafeAreaView style={styles.container} className="bg-[#00CCBB] justify-center flex-1 items-center">
      <Animatable.Image
        source={require("../assets/delivery_gif.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-52 w-52"
      ></Animatable.Image>
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

        <Progress.Circle size={60} indeterminate={true} color="white" fill='none'></Progress.Circle>
      
    </SafeAreaView>
  )
}

export default PreparingOrderScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
  });
  