import React from 'react';
import { View, StyleSheet , Image  , Text} from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import twrnc from 'twrnc';

const PasswordResetSent = ({ navigation }) => {
  const handleLoginNavigation = () => {
    navigation.navigate("Login"); // Navigate to the login page
  };

  return (
    <View style={twrnc`flex-1 bg-white  p-6 justify-center items-center`}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/email-sent.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Title style={twrnc`text-green-400 font-bold text-2xl text-center`}>Lien de réinitialisation envoyé</Title>
          <Paragraph style={twrnc`text-gray-300 text-lg text-center mt-2`}>
            Nous avons envoyé un lien de réinitialisation de mot de passe à votre adresse e-mail.
            <Text style={twrnc`text-gray-400`}> Veuillez vérifier votre boîte de réception.</Text>
          </Paragraph>
        </Card.Content>
        <Card.Actions style={twrnc`justify-center`}>
          <Button 
            mode="contained" 
            onPress={handleLoginNavigation} 
            style={twrnc`bg-green-500 w-4/4 h-14 rounded-full shadow-lg`}>
            <Text style={twrnc`text-white text-centre p-3 text-lg font-semibold`}>Se Connecter</Text>
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    backgroundColor:'white'
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
  },
});

export default PasswordResetSent;
