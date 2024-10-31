import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import SvgUri from 'react-native-svg-uri';
import { forgotPassword } from '../services/authservice'; // Import the service
import twrnc from 'twrnc';
import CustomDialog from './components/dialogue';
import { useLoading } from '../config/LoadingContext'; // Import the loading hook

function ForgotPassword({ navigation }) {
  const { showLoader, hideLoader } = useLoading(); // Get loader functions
  const [email, setEmail] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  const showDialog = (title, content) => {
    setDialogTitle(title);
    setDialogContent(typeof content === 'string' ? content : String(content));
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const ArrowIcon = () => (
    <SvgUri
      source={require('../assets/left-arrow.svg')}
      style={{ width: 24, height: 24 }}
    />
  );

  const handleSubmit = async () => {
    if (!email) {
      showDialog("Validation Error", "Please enter your email address.");
      return;
    }

    showLoader(); // Show loader when starting the operation

    try {
      const response = await forgotPassword({ email });
      console.log('res', response);
      if (response.status === 202) {
        navigation.navigate('PasswordResetSent');
      } else {
        showDialog("Error", response.data.error || "Something went wrong.");
      }
    } catch (error) {
      showDialog("Error", error.response?.data?.error || "Failed to send reset link. Please try again later.");
    } finally {
      hideLoader(); // Hide loader when the operation is complete
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 20, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <ArrowIcon />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }} showsVerticalScrollIndicator={false}>
        <Card style={twrnc`mb-4 p-4 bg-white shadow-md rounded-lg`}>
          <Card.Content>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center' }}>
              Mot de passe oublié
            </Text>
          </Card.Content>
        </Card>

        <View style={{ marginBottom: 20 }}>
          <TextInput
            label="Email"
            placeholder="Entrez votre email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={twrnc`mb-4 bg-white border-green-400`}
            textColor='black'
            theme={{ colors: { primary: '#4CAF50' } }}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{ backgroundColor: '#4CAF50', height: 48 }}
        >
          <Text style={twrnc`text-white`}>Envoyer</Text>
        </Button>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
          <Text style={{ color: '#B0BEC5', fontSize: 16 }}>
            Vous avez déjà un compte?
          </Text>
          <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: '#FF5722', fontWeight: 'bold', fontSize: 16 }}>Se Connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomDialog
        visible={dialogVisible}
        title={dialogTitle}
        content={typeof dialogContent === 'string' ? dialogContent : ''}
        onDismiss={hideDialog}
        isError={true}
      />
    </KeyboardAvoidingView>
  );
}

export default ForgotPassword;
