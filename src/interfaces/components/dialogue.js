import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { View, Image } from 'react-native';
import tw from 'twrnc';

const CustomDialog = (props) => {
  const { visible, title, content, onDismiss, isError } = props;  
  if (!visible) return null;

  return (
    <Portal>
      <Dialog 
        visible={visible} 
        onDismiss={onDismiss} 
        style={tw`bg-white rounded-lg shadow-lg max-w-xs mx-auto`} 
      >
        <View style={tw`flex-row items-center p-4`}>
          <Image 
            source={isError ? require('../../assets/error.png') : require('../../assets/success.png')} 
            style={{ width: 24, height: 24 }} 
          />
          <Dialog.Title style={tw`font-bold text-lg ml-2 ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {title}
          </Dialog.Title>
        </View>
        <Dialog.Content>
          <Text style={tw`text-gray-800`}>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="contained" onPress={onDismiss} style={tw`${isError ? 'bg-red-600' : 'bg-green-600  text-white ' }`}>
          <Text style={tw`text-white`}>
Close
</Text>
           </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
