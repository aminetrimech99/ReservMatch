import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import twrnc from 'twrnc';
import SvgUri from 'react-native-svg-uri';

function ForgotPasswordnext() {
  const [email, setEmail] = useState('');   
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const ArrowIcon = () => (
    <SvgUri 
      source={require('../assets/left-arrow.svg')} 
      style={{ width: 24, height: 24 }} 
    />
  );

  const EyeIcon = () => (
    <SvgUri 
      source={require('../assets/eye.svg')} 
      style={{ width: 24, height: 24 }} 
    />
  );

  const EyeIconOff = () => (
    <SvgUri 
      source={require('../assets/eye-off.svg')} 
      style={{ width: 24, height: 24 }} 
    />
  );

  return (
    <View style={twrnc`flex-1 bg-grey-800 p-6 relative`}>
      <TouchableOpacity 
        style={twrnc`absolute text-base top-4 left-4`}
        onPress={() => console.log('Go Back')}
      >
        <ArrowIcon />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={twrnc`flex-grow justify-start`} showsVerticalScrollIndicator={false}>
        <View style={twrnc`w-full mb-6`}>
          <Text style={twrnc`text-4xl mb-1 mt-4 text-left font-bold text-green-400 text-shadow-md`}>
            Mot de passe oublié
          </Text>
        </View>

        {/* New Password Label */}
        <View style={twrnc`w-full mb-2`}>
          <Text style={twrnc`text-gray-700 text-lg font-semibold`}>Nouveau mot de passe</Text>
        </View>

        {/* New Password Input */}
        <View style={twrnc`flex-row items-center bg-white rounded-full p-1 mb-4 h-12 w-full shadow-md`}>
          <TextInput
            placeholder="Nouveau mot de passe"
            placeholderTextColor="#A0AEC0"
            secureTextEntry={!passwordVisible}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            style={twrnc`flex-1 text-base`}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={twrnc`ml-2`}>
            {passwordVisible ? <EyeIconOff /> : <EyeIcon />}
          </TouchableOpacity>
        </View>

        {/* Confirm New Password Label */}
        <View style={twrnc`w-full mb-2`}>
          <Text style={twrnc`text-gray-700 text-lg font-semibold`}>Confirmer le mot de passe</Text>
        </View>

        {/* Confirm New Password Input */}
        <View style={twrnc`flex-row items-center bg-white rounded-full p-1 mb-6 h-12 w-full shadow-md`}>
          <TextInput
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#A0AEC0"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmNewPassword}
            onChangeText={(text) => setConfirmNewPassword(text)}
            style={twrnc`flex-1 text-base`}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={twrnc`ml-2`}>
            {confirmPasswordVisible ? <EyeIconOff /> : <EyeIcon />}
          </TouchableOpacity>
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity style={twrnc`bg-green-500 rounded-full w-3/4 self-center shadow-lg mb-4 h-14 justify-center`}>
          <Text style={twrnc`text-white text-center text-lg font-semibold`}>Réinitialiser le mot de passe</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <View style={twrnc`flex-row items-center justify-center`}>
          <Text style={twrnc`text-gray-800 text-base font-semibold`}>
            Vous avez déjà un compte? 
          </Text>
          <TouchableOpacity style={twrnc`ml-2`} onPress={() => console.log("Login Pressed")}>
            <Text style={twrnc`text-orange-500 font-semibold text-base`}>Se Connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default ForgotPasswordnext;
