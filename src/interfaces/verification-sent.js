import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Title } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import twrnc from 'twrnc';

const VerificationEmailSent = ({ navigation }) => {
  const theme = useTheme();

  const handleResendEmail = () => {
    console.log('Resend verification email');
  };

  const handleLoginNavigation = () => {
    navigation.navigate("Login"); // Navigate to the login page
  };

  return (
    <View style={twrnc`flex-1 p-6 justify-center bg-white items-center`}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={twrnc`text-green-400 text-2xl text-center`}>Vérification de l'email envoyée</Title>
          <Text style={twrnc`text-gray-300 text-lg text-center mt-4`}>
            Nous avons envoyé un lien de vérification à votre adresse e-mail.
            <Text style={twrnc`text-gray-400`}> Veuillez vérifier votre boîte de réception.</Text>
          </Text>
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleResendEmail} 
          style={styles.button}
          contentStyle={styles.buttonContent}
        >

  <Text style={twrnc`text-white`}>Renvoyer l'email de vérification</Text>
 </Button>
        <Button 
          mode="text" 
          onPress={handleLoginNavigation} 
          style={styles.linkButton}
        >
          Se Connecter
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'white',  
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    backgroundColor:'green',
    marginVertical: 8,
  },
  buttonContent: {
    height: 56,
  },
  linkButton: {
    marginTop: 8,
  },
});

export default VerificationEmailSent;
