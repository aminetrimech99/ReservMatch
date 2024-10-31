import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import twrnc from 'twrnc';
import { Text, Button, Card } from 'react-native-paper';

const Home = ({ navigation }) => {
  return (
    <View style={twrnc`flex-1 justify-center items-center bg-gray-100 p-6`}>
      {/* Header Image or Illustration */}
      <Image
        source={{ uri: 'https://en.reformsports.com/oxegrebi/2020/10/nizami-futbol-saha-1.png' }} // Image URL
        style={twrnc`h-32 w-64 rounded-lg mb-8`} // Adjusted height and width for better visuals
        resizeMode="cover"
      />

      {/* Main Title */}
      <Text style={twrnc`text-6xl font-extrabold text-center mb-2`}>
        <Text style={twrnc`text-gray-800`}>MY</Text>
        <Text style={twrnc`text-green-600`}> URBAN</Text>
      </Text>

      {/* Subtitle - Sport Indoor */}
      <Text style={twrnc`text-green-500 text-center text-2xl font-medium mb-4`}>
        Sport Indoor
      </Text>

      {/* Description with clear spacing */}
      <Text style={twrnc`text-gray-600 text-center text-lg font-light mb-10`}>
        Commencez votre aventure dans notre application !
      </Text>

      {/* Buttons with Paper components */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={twrnc`bg-green-600 w-80 mb-4 shadow-lg`}
        labelStyle={twrnc`text-white font-semibold`}
      >
        Se connecter
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('SignUp')}
        style={twrnc`w-80 mb-4`}
        labelStyle={twrnc`text-green-600 font-semibold`}
        contentStyle={twrnc`border border-green-600`}
      >
        S'inscrire
      </Button>
    </View>
  );
};

export default Home;
