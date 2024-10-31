import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import twrnc from 'twrnc';
import SvgUri from 'react-native-svg-uri';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { login } from '../services/authservice';
import CustomDialog from './components/dialogue';  
import { useLoading } from '../config/LoadingContext';

function Login({ navigation, onLoginSuccess }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const { isLoading, showLoader, hideLoader } = useLoading();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const showDialog = (title, content) => {
    setDialogTitle(title);
    setDialogContent(typeof content === 'string' ? content : String(content));
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };
  const handleLogin = async () => {
    const signinData = { email, password };

    showLoader(); // Start the loader when login process begins

    try {
      const loginRes = await login(signinData);

      if (loginRes.status === 200) {
        onLoginSuccess();
        navigation.navigate('Accueil');
      }
    
    } catch (error) {
      if (error.status === 400) {
        setIsError(true);
        showDialog("Erreur", "Identifiants incorrects. Veuillez réessayer.");
      } else {
        showDialog("Erreur", "Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {

      hideLoader(); // Stop the loader after login completes
    }
  };

  const EmailIcon = () => (
    <SvgUri source={require('../assets/email.svg')} style={{ width: 24, height: 24 }} />
  );

  const PasswordIcon = () => (
    <SvgUri source={require('../assets/password.svg')} style={{ width: 24, height: 24 }} />
  );

  const EyeOffIcon = () => (
    <SvgUri source={require('../assets/eye-off.svg')} style={{ width: 24, height: 24 }} />
  );

  const EyeIcon = () => (
    <SvgUri source={require('../assets/eye.svg')} style={{ width: 24, height: 24 }} />
  );

  const ArrowIcon = () => (
    <SvgUri source={require('../assets/left-arrow.svg')} style={{ width: 24, height: 24 }} />
  );

  return (
    <View style={twrnc`flex-1 justify-center items-center bg-grey-800 p-6 relative`}>
      <TouchableOpacity style={twrnc`absolute text-base top-4 left-4`} onPress={() => navigation.navigate('Home')}>
        <ArrowIcon />
      </TouchableOpacity>

      <Card style={twrnc`w-full mb-6 p-4 bg-white rounded-lg`}>
        <Text style={twrnc`text-xl mb-1 text-center font-bold text-green-600`}>Se Connecter</Text>
      </Card>

      <View style={twrnc`w-full mb-4`}>
        <TextInput
          label="Email*"
          mode="outlined"
          placeholder="Email"
          placeholderTextColor="#BEBEBE"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          theme={{ colors: { primary: '#4CAF50', text: 'black' } }} // Set text color to black
          left={<TextInput.Icon icon={() => <EmailIcon />} />}
          style={twrnc`mb-4 bg-white border-green-400`} // Keep other styles as is
          textColor='black'
        />
      </View>

      <View style={twrnc`w-full mb-4`}>
        <TextInput
          label="Mot de passe*"
          mode="outlined"
          placeholder="Mot de passe"
          secureTextEntry={!passwordVisible}
          theme={{ colors: { primary: '#4CAF50', text: 'black' } }} // Set text color to black
          left={<TextInput.Icon icon={() => <PasswordIcon />} />}
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={passwordVisible ? EyeOffIcon : EyeIcon}
              onPress={togglePasswordVisibility}
            />
          }
          style={twrnc`mb-4 bg-white border-red-400`}
              textColor='black'
        />
      </View>

      <TouchableOpacity style={twrnc`mt-4 mb-4`} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={twrnc`text-green-600 font-semibold text-base`}>Mot de passe oublié?</Text>
      </TouchableOpacity>

      <Button mode="contained" onPress={handleLogin} style={twrnc`w-80 bg-green-500 mb-4`}>
        Se connecter
      </Button>

      <View style={twrnc`flex-row items-center justify-center mt-4`}>
        <Text style={twrnc`text-gray-800 text-base font-semibold`}>
          Vous n'avez pas de compte?
        </Text>
        <TouchableOpacity style={twrnc`ml-2`} onPress={() => navigation.navigate('SignUp')}>
          <Text style={twrnc`text-orange-500 font-semibold text-base`}>S'inscrire?</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Dialog */}
      <CustomDialog
        visible={dialogVisible}
        title={dialogTitle}
        content={typeof dialogContent === 'string' ? dialogContent : ''}
        onDismiss={hideDialog}
        isError={isError}
      />
    </View>
  );
}

export default Login;
