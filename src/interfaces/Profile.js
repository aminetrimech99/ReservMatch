import React, { useState, useRef } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import twrnc from 'twrnc';
import SvgUri from 'react-native-svg-uri';
import PhoneInput from 'react-native-phone-number-input';
import CountryPicker from 'react-native-country-picker-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'react-native-image-picker'; // Import image picker

const EyeIcon = () => (
  <SvgUri source={require('../assets/eye.svg')} style={{ width: 24, height: 24 }} />
);
const EyeOffIcon = () => (
  <SvgUri source={require('../assets/eye-off.svg')} style={{ width: 24, height: 24 }} />
);
const LeftArrowIcon = () => (
  <SvgUri source={require('../assets/left-arrow.svg')} style={{ width: 24, height: 24 }} />
);

function Profile({ navigation }) {
  const countryPickerRef = useRef();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarSource, setAvatarSource] = useState(null);

  const handleProfileUpdate = async () => {
    const profileData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      country: selectedCountry?.name,
      dateOfBirth: dateOfBirth.toISOString().split('T')[0],
      gender,
      role,
      password,
      avatar: avatarSource, // Include avatar in the data
    };

    // Placeholder for profile update logic
    Alert.alert('Success', 'Profile updated successfully');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    countryPickerRef.current?.closeModal();
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const handleAvatarUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setAvatarSource(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={twrnc`flex-1 bg-gray-50 p-6`}>
      <TouchableOpacity 
        style={twrnc`absolute top-4 left-4`}
        onPress={() => navigation.goBack()}
      >
        <LeftArrowIcon />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={twrnc`flex-grow justify-start`} showsVerticalScrollIndicator={false}>
        <Text style={twrnc`text-3xl mb-6 text-center font-bold text-gray-800`}>
          Mon Profil
        </Text>

        {/* Avatar Upload */}
        <TouchableOpacity onPress={handleAvatarUpload} style={twrnc`mb-6`}>
          {avatarSource ? (
            <Image
              source={{ uri: avatarSource }}
              style={twrnc`w-32 h-32 rounded-full border-2 border-green-500 self-center mb-4`}
            />
          ) : (
            <View style={twrnc`w-32 h-32 rounded-full border-2 border-green-500 self-center mb-4 items-center justify-center`}>
              <Text style={twrnc`text-green-500`}>Upload Avatar</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Input Fields */}
        <View style={twrnc`w-full mb-4 p-4 bg-white rounded-lg shadow-md border border-green-300`}>
          <Text style={twrnc`mb-2 text-gray-700`}>Prénom*</Text>
          <TextInput
            placeholder="Prénom"
            placeholderTextColor="#BEBEBE"
            style={twrnc`border border-gray-300 p-4 rounded-lg bg-white`}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={twrnc`w-full mb-4 p-4 bg-white rounded-lg shadow-md border border-green-300`}>
          <Text style={twrnc`mb-2 text-gray-700`}>Nom*</Text>
          <TextInput
            placeholder="Nom"
            placeholderTextColor="#BEBEBE"
            style={twrnc`border border-gray-300 p-4 rounded-lg bg-white`}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={twrnc`w-full mb-4 p-4 bg-white rounded-lg shadow-md border border-green-300`}>
          <Text style={twrnc`mb-2 text-gray-700`}>Email*</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#BEBEBE"
            keyboardType="email-address"
            style={twrnc`border border-gray-300 p-4 rounded-lg bg-white`}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={twrnc`w-full mb-4 p-4 bg-white rounded-lg shadow-md border border-green-300`}>
          <Text style={twrnc`mb-2 text-gray-700`}>Téléphone*</Text>
          <PhoneInput
            defaultValue={phoneNumber}
            onChangeFormattedText={setPhoneNumber}
            placeholder="Téléphone"
            containerStyle={twrnc`border border-gray-300 rounded-lg bg-white`}
            textContainerStyle={twrnc`bg-gray-200`}
          />
        </View>

        <View style={twrnc`w-full mb-4 p-4 bg-white rounded-lg shadow-md border border-green-300`}>
          <Text style={twrnc`mb-2 text-gray-700`}>Pays*</Text>
          <TouchableOpacity
            onPress={() => countryPickerRef.current?.openModal()}
            style={twrnc`border border-gray-300 p-4 rounded-lg bg-white`}
          >
            <Text style={twrnc`text-gray-700`}>
              {selectedCountry ? selectedCountry.name : 'Sélectionnez un pays'}
            </Text>
          </TouchableOpacity>
          <CountryPicker 
            ref={countryPickerRef}
            withFilter
            withFlag
            withCountryNameButton
            withCallingCode
            visible={false} // Handle visibility with state if needed
            onSelect={handleCountrySelect}
          />
        </View>

        <View style={twrnc`w-full mb-4 p-4 bg-white rounded-lg shadow-md border border-green-300`}>
          <Text style={twrnc`mb-2 text-gray-700`}>Date de naissance*</Text>
          <TouchableOpacity onPress={showDatepicker} style={twrnc`border border-gray-300 p-4 rounded-lg bg-white`}>
            <Text style={twrnc`text-gray-700`}>
              {dateOfBirth ? dateOfBirth.toLocaleDateString() : 'Sélectionnez votre date de naissance'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={twrnc`w-full mb-4 p-4 bg-white rounded-lg shadow-md border border-green-300`}>
          <Text style={twrnc`mb-2 text-gray-700`}>Genre*</Text>
          <View style={twrnc`flex-row justify-between`}>
            <TouchableOpacity
              style={twrnc`border border-gray-300 p-4 rounded-lg bg-white flex-1 mr-2`}
              onPress={() => setGender('male')}
            >
              <Text style={twrnc`text-center text-gray-700`}>Homme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={twrnc`border border-gray-300 p-4 rounded-lg bg-white flex-1`}
              onPress={() => setGender('female')}
            >
              <Text style={twrnc`text-center text-gray-700`}>Femme</Text>
            </TouchableOpacity>
          </View>
        </View>

      

        <View style={twrnc`w-full mb-4 p-4 bg-white rounded-lg shadow-md border border-green-300`}>
          <Text style={twrnc`mb-2 text-gray-700`}>Mot de passe*</Text>
          <View style={twrnc`flex-row items-center border border-gray-300 rounded-lg bg-white`}>
            <TextInput
              placeholder="Mot de passe"
              secureTextEntry={!passwordVisible}
              style={twrnc`flex-1 p-4 text-gray-700`}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity
          style={twrnc`bg-green-600 p-4 rounded-lg items-center justify-center`}
          onPress={handleProfileUpdate}
        >
          <Text style={twrnc`text-white text-lg font-semibold`}>Mettre à jour le profil</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={twrnc`mt-4`}>
          <Text style={twrnc`text-red-500 text-center text-base`}>
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Profile;
