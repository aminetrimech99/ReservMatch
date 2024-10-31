import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import SvgUri from 'react-native-svg-uri';
import { CountryPicker } from 'react-native-country-codes-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { signUp } from '../services/authservice';
import { phoneNumCountry } from '../config/num-tel';
import twrnc from 'twrnc';
  import DateTimePicker from '@react-native-community/datetimepicker';
import CustomDialog from './components/dialogue';
import { useLoading } from '../config/LoadingContext';

// SVG icons
const EyeIcon = () => (
  <SvgUri source={require('../assets/eye.svg')} style={{ width: 24, height: 24 }} />
);
const EyeOffIcon = () => (
  <SvgUri source={require('../assets/eye-off.svg')} style={{ width: 24, height: 24 }} />
);
const LeftArrowIcon = () => (
  <SvgUri source={require('../assets/left-arrow.svg')} style={{ width: 24, height: 24 }} />
);

function SignUp({ navigation }) {
  const countryPick = useRef();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('');
   const [datePickerVisible, setDatePickerVisible] = useState(false); // State to control the DateTimePicker visibility
   const [dialogVisible, setDialogVisible] = useState(false);
   const [isError, setIsError] = useState(false);
   const [dialogTitle, setDialogTitle] = useState('');
   const [dialogContent, setDialogContent] = useState('');
   const { showLoader, hideLoader } = useLoading(); // Get loader functions

   const showDialog = (title, content) => {
    setDialogTitle(title);
    setDialogContent(typeof content === 'string' ? content : String(content));
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  }; 
 
 
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setDatePickerVisible(false); // Hide the date picker
    setDateOfBirth(currentDate); // Update the date of birth state
  };

 

   const [visible, setVisible] = useState(false);

  
   const [isVisibleCountry, setIsVisibleCountry] = useState(false);
  const [isVisibleNumber, setIsVisibleNumber] = useState(false);

  // Error state
  const [errors, setErrors] = useState({});

 

  const handleDismiss = () => setVisible(false);
  
  const validateInputs = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'Le prénom est requis.';
    if (!lastName) newErrors.lastName = 'Le nom est requis.';
    if (!email) newErrors.email = 'Adresse e-mail est requis.';
    if (!password) newErrors.password = 'Le mot de passe est requis.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    if (!selectedCountry) newErrors.country = 'Le pays est requis.';
    if (!phoneNumber || !code) newErrors.phoneNumber = 'Le numéro est requis.';
 
    if (!selectedGender) newErrors.gender = 'Le genre est requis.';
    if (!selectedRole) newErrors.role = 'Le rôle est requis.';
    return newErrors;
  };

  const handleSignUp = async () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const signupData = {
      firstName,
      lastName,
      email,
      address,
      phoneNumber: `${code.trim()}${phoneNumber.trim()}`,
      country: selectedCountry,
      dateOfBirth: dateOfBirth.toISOString().split('T')[0], // Use toISOString to get the date string
      gender: selectedGender,
      role: selectedRole,
      password,
    };
  console.log(signupData,"s")
  showLoader();
  try {
    const response = await signUp(signupData);
    console.log('res', response);
    if (response.status === 201) {
      navigation.navigate('VerificationEmailSent'); // Change this as per your navigation structure
    } else {
      showDialog("Erreur", response.data.message || "Something went wrong.");
    }
  } catch (error) {
    showDialog("Erreur", error.response?.data?.error || "Failed to sign up. Please try again later.");
  } finally {
    hideLoader(); // Hide loader when the operation is complete
  }

  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const handleCountry = (country) => {
    setSelectedCountry(country);
   
  };

  const handleCountrySelect = (country) => {
    console.log(country.name.pl);
    setSelectedCountry(country.name.pl);
    console.log(selectedCountry);
    setIsVisibleCountry(false); // Close the country picker
    setErrors({ ...errors, country: null }); // Clear error if country selected
  };


  const [code , setCode] = useState('')

  const handleNumberSelect = (country) => {
     setCode(country.dial_code)
      setIsVisibleNumber(false); 
    setErrors({ ...errors, phoneNumber: null }); 
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB', padding: 16 }}>
      <TouchableOpacity 
        style={{ position: 'absolute', top: 16, left: 16 }}
        onPress={() => navigation.goBack()}
      >
        <LeftArrowIcon />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
      <Card style={{ padding: 16, marginBottom: 24, backgroundColor: '#FFFFFF' }}>
  <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold', color: '#4CAF50' }}>
    Créer un compte
  </Text>
</Card>


        {/* Inputs Section */}
        <TextInput
          label="Prénom*"
          value={firstName}
          onChangeText={(value) => {
            setFirstName(value);
            setErrors({ ...errors, firstName: null }); // Clear error
          }}
          mode="outlined"  theme={{ colors: { primary: '#4caf50', text: 'black' } }} // set text color to black
          textColor='black'
          error={!!errors.firstName}
                    style={twrnc`mb-4 bg-white border-green-400`}

        />
        {errors.firstName && <Text style={{ color: 'red' }}>{errors.firstName}</Text>}

        <TextInput
          label="Nom*"
          value={lastName}
          textColor='black'

          onChangeText={(value) => {
            setLastName(value);
            setErrors({ ...errors, lastName: null }); // Clear error
          }}
          mode="outlined"  theme={{ colors: { primary: '#4caf50', text: 'black' } }} // set text color to black

          error={!!errors.lastName}
                    style={twrnc`mb-4 bg-white border-green-400`}

        />
        {errors.lastName && <Text style={{ color: 'red' }}>{errors.lastName}</Text>}

        <TextInput
          label="Email*"
          value={email}
          textColor='black'

          onChangeText={(value) => {
            setEmail(value);
            setErrors({ ...errors, email: null }); // Clear error
          }}
          mode="outlined"  theme={{ colors: { primary: '#4caf50', text: 'black' } }} // set text color to black

          keyboardType="email-address"
          error={!!errors.email}
                    style={twrnc`mb-4 bg-white border-green-400`}

        />
        {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
        <TextInput
          label="Adresse*"
          value={address}
          textColor='black'

          onChangeText={(value) => {
            setAddress(value);
            setErrors({ ...errors, address: null }); // Clear error
          }}
          mode="outlined"  theme={{ colors: { primary: '#4caf50', text: 'black' } }} // set text color to black

          error={!!errors.address}
                    style={twrnc`mb-4 bg-white border-green-400`}

        />
        {errors.address && <Text style={{ color: 'red' }}>{errors.address}</Text>}
               
       {/* Date of Birth Input */}
       <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <TextInput
            label="Date de naissance*"
            value={dateOfBirth ? dateOfBirth.toLocaleDateString() : ''}
            mode="outlined"
            theme={{ colors: { primary: '#4caf50', text: 'black' } }} // Set text color to black
            editable={false} 
            style={twrnc`mb-4 bg-white border-green-400`}
             textColor='black'
          />
        </TouchableOpacity>
        {errors.date && <Text style={{ color: 'red' }}>{errors.date}</Text>}
        
        {/* DateTimePicker Component */}
        {datePickerVisible && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
       
        {/* Country Picker for Phone Number */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12  }}>
  {/* Country Code Input */}
  <TouchableOpacity
    onPress={() => setIsVisibleNumber(true)}
    style={{
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 12,
      marginRight: 8,
      marginBottom:8,
      height:50,
       backgroundColor: '#fff',
      minWidth: 80 ,
       justifyContent: 'center', // Center content vertically
    }}
  >
    <Text style={{ color: phoneNumber ? 'black' : '#BEBEBE' }}>
      {code}
    </Text>
  </TouchableOpacity>

  {/* Phone Number Input */}
  <TextInput
    label="Numéro de téléphone*"
    value={phoneNumber} // Remove code for user-friendly display
    onChangeText={(value) => {
      setPhoneNumber(`${value}`); // Update number with code
      setErrors({ ...errors, phoneNumber: null }); // Clear error
    }}
    mode="outlined"
    theme={{ colors: { primary: '#4caf50', text: 'black' } }} // Set text color to black
    keyboardType="phone-pad"
     textColor='black'
    error={!!errors.phoneNumber}
    style={twrnc`flex: 1 mb-4 bg-white border-green-400 w-59`} // Take the remaining space
  />

</View>
 
<CountryPicker
  style={{
    modal: { height: 500 },
    itemsList: { color: 'black' },
    textInput: { height: 80, borderRadius: 0, color: 'black' },
    countryButtonStyles: { height: 80 },
    dialCode: { color: 'black' },
    countryName: { color: 'black' },
  }}
  show={isVisibleNumber}
  pickerButtonOnPress={(country) => {
    handleNumberSelect(country);
  }}

/>

 
        {/* Country Picker */}
        <TouchableOpacity
  onPress={() => setIsVisibleCountry(true)}
  style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff' }}
>
  <Text style={{ color: selectedCountry && typeof selectedCountry.name === 'string' ? 'black' : '#BEBEBE' }}>
    {selectedCountry && typeof selectedCountry === 'string' ? selectedCountry : 'Sélectionnez un pays'}
  </Text>
</TouchableOpacity>

        <CountryPicker
           style={{
             modal: {
                height: 500,
             },
             backdrop: {
            
            },
            // Styles for bottom input line [View]
            line: {
            
            },
            // Styles for list of countries [FlatList]
            itemsList: {
              color:'black'
            },
            // Styles for input [TextInput]
            textInput: {
                  height: 80,
                  borderRadius: 0,
                  color:'black'
            },
            // Styles for country button [TouchableOpacity]
            countryButtonStyles: {
                  height: 80
            },
            // Styles for search message [Text]
            searchMessageText: {
    
            },
            // Styles for search message container [View]
            countryMessageContainer: {
               color:'black'
            },
            // Flag styles [Text]
            flag: {
    
            },
            // Dial code styles [Text]
            dialCode: {
              color:'black',
            display:'none'
            },
            // Country name styles [Text]
            countryName: {
      color:'black'
            }
        }}
          show={isVisibleCountry}
          pickerButtonOnPress={handleCountrySelect}
        />
        {errors.country && <Text style={{ color: 'red' }}>{errors.country}</Text>}

        {/* Gender Selection */}
        <DropDownPicker
          placeholder="Sélectionnez votre genre*"
          open={open}
          value={selectedGender}
          textColor='black'

          items={[
            { label: 'Homme', value: 'male' },
            { label: 'Femme', value: 'female' },
          ]}
          setOpen={setOpen}
          setValue={setSelectedGender}
          setItems={() => {}}
          style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 12 }}
          dropDownContainerStyle={{ borderWidth: 1, borderColor: '#ccc' }}
        />
        {errors.gender && <Text style={{ color: 'red' }}>{errors.gender}</Text>}

        {/* Role Selection */}
        <View           style={twrnc`mb-4 bg-white border-green-400`}
>
          <Text style={{ fontSize: 16, marginBottom: 8, color: 'black' }}>Je suis un :</Text>
          <TouchableOpacity onPress={() => setSelectedRole('owner')} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ width: 20, height: 20, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              {selectedRole === 'owner' && <View style={{ width: 10, height: 10, backgroundColor: '#4CAF50', borderRadius: 5 }} />}
            </View>
            <Text style={{ marginLeft: 8, color: 'black' }}>Propriétaire</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedRole('client')} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 20, height: 20, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              {selectedRole === 'client' && <View style={{ width: 10, height: 10, backgroundColor: '#4CAF50', borderRadius: 5 }} />}
            </View>
            <Text style={{ marginLeft: 8, color: 'black' }}>Locataire</Text>
          </TouchableOpacity>
          {errors.role && <Text style={{ color: 'red' }}>{errors.role}</Text>}
        </View>

        {/* Password Input */}
        <TextInput
          label="Mot de passe*"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setErrors({ ...errors, password: null });
          }}
          mode="outlined"  theme={{ colors: { primary: '#4caf50', text: 'black' } }} // set text color to black
          textColor='black'

          secureTextEntry={!passwordVisible}
          right={<TextInput.Icon icon={passwordVisible ? <EyeOffIcon /> : <EyeIcon />} onPress={togglePasswordVisibility} />}
          error={!!errors.password}
                    style={twrnc`mb-4 bg-white border-green-400`}

        />
        {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

        {/* Confirm Password Input */}
        <TextInput
          label="Confirmer le mot de passe*"
          value={confirmPassword}
          textColor='black'

          onChangeText={(value) => {
            setConfirmPassword(value);
            setErrors({ ...errors, confirmPassword: null });
          }}
 
          mode="outlined" 
          theme={{ colors: { primary: '#4caf50', text: 'black' } }} 

          secureTextEntry={!confirmPasswordVisible}
          right={<TextInput.Icon icon={confirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />} onPress={toggleConfirmPasswordVisibility} />}
          error={!!errors.confirmPassword}
          style={twrnc`mb-4 bg-white border-green-400`}

        />
        {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}

        {/* Sign Up Button */}
        <Button
  mode="contained"
  onPress={handleSignUp}
  style={{ marginBottom: 16, backgroundColor: '#4CAF50' }} 
  labelStyle={{ color: '#FFFFFF' }} 
>
  S'inscrire
</Button>

        {/* Login Redirect */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#6B7280', textAlign: 'center' }}>
            Déjà un compte? <Text style={{ color: '#3B82F6' }}>Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomDialog
        visible={dialogVisible}
        title={dialogTitle}
        content={typeof dialogContent === 'string' ? dialogContent : ''}
        onDismiss={hideDialog}
        isError={true}
      />
    </View>
  );
}

export default SignUp;
