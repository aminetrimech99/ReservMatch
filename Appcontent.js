import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './src/navigation/buttomNavigator';
import Login from './src/interfaces/Login';
import SignUp from './src/interfaces/signup';
import Home from './src/interfaces/Home';
import ForgotPassword from './src/interfaces/forgetpassword';
import PasswordResetSent from './src/interfaces/PasswordResetSent';
import VerificationEmailSent from './src/interfaces/verification-sent';
import { useLoading } from './src/config/LoadingContext';
import { View } from 'react-native';
import Lottie from 'lottie-react-native';

const Stack = createStackNavigator();

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // For Lottie animation
  const { isLoading, showLoader, hideLoader } = useLoading(); // Access loading state

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const loadLoginState = async () => {
    showLoader(); // Start loader when checking login state
    await new Promise(resolve => setTimeout(resolve, 2000)); // Mock async operation
    hideLoader(); // Hide loader after operation completes
  };

  useEffect(() => {
    const loadData = async () => {
      await loadLoginState();
      setInitialLoading(false); // Hide Lottie animation after loading state
    };
    loadData(); // Check login state on app mount
  }, []);

  return (
    <>
      {initialLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A7E7B5' }}>
          <Lottie 
            source={require('./src/config/Homeanimation.json')} // Path to your Lottie file
            autoPlay 
            loop={false} // Play only once
            onAnimationFinish={() => setInitialLoading(false)} // Call back to set initialLoading to false after the animation
            style={{ width: 200, height: 200 }} // Adjust size as needed
          />
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login">
                  {(props) => <Login {...props} onLoginSuccess={handleLoginSuccess} />}
                </Stack.Screen>
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="PasswordResetSent" component={PasswordResetSent} />
                <Stack.Screen name="VerificationEmailSent" component={VerificationEmailSent} />
              </>
            ) : (
              <Stack.Screen name="Main" component={BottomTabNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
      
      {isLoading && !initialLoading && ( // Only show loader if not in initial loading
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#A7E7B5',
        }}>
          <Lottie 
            source={require('./src/config/Homeanimation.json')} // Path to your loader Lottie file
            autoPlay 
            loop 
            style={{ width: 100, height: 100 }} // Adjust size as needed
          />
        </View>
      )}
    </>
  );
}

export default AppContent;
