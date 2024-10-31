// BottomNavBar.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import twrnc from 'twrnc';
import SvgUri from 'react-native-svg-uri';

function BottomNavBar({ navigation }) {
  const HomeIcon = () => (
    <SvgUri source={require('../../assets/home.svg')} style={{ width: 24, height: 24 }} />
  );

  const AddIcon = () => (
    <SvgUri source={require('../../assets/add.svg')} style={{ width: 24, height: 24 }} />
  );

  const MessageIcon = () => (
    <SvgUri source={require('../../assets/message.svg')} style={{ width: 24, height: 24 }} />
  );

  const ProfileIcon = () => (
    <SvgUri source={require('../../assets/profile.svg')} style={{ width: 24, height: 24 }} />
  );

  return (
    <View style={twrnc`flex-row justify-around items-center bg-white p-3 shadow-md`}>
      <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
        <HomeIcon />
        <Text style={twrnc`text-xs text-gray-800 mt-1`}>Accueil</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Add')}>
        <AddIcon />
        <Text style={twrnc`text-xs text-gray-800 mt-1`}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Message')}>
        <MessageIcon />
        <Text style={twrnc`text-xs text-gray-800 mt-1`}>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <ProfileIcon />
        <Text style={twrnc`text-xs text-gray-800 mt-1`}>profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BottomNavBar;
