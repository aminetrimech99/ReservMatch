import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper'; // Import PaperProvider
import { LoadingProvider } from './src/config/LoadingContext';
import AppContent from './Appcontent';


function App() {
  return (
    
      <PaperProvider>
        <LoadingProvider> 
        <AppContent />
        </LoadingProvider>
      </PaperProvider>
   
  );
}

export default App;
