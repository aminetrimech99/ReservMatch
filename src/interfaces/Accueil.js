import React from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import twrnc from 'twrnc';
import SvgUri from 'react-native-svg-uri';


function Accueil() {
  const notificationCount = 3; // Example notification count

  const BellIcon = () => (
    <SvgUri 
      source={require('../assets/bell.svg')} 
      style={{ width: 24, height: 24 }} 
    />
  );

  const ExitIcon = () => (
    <SvgUri 
      source={require('../assets/exit.svg')} 
      style={{ width: 24, height: 24 }} 
    />
  );

  return (
    <View style={twrnc`flex-1 bg-grey-100 p-6`}>
      {/* App Bar */}
      <View style={twrnc`flex-row items-center justify-between bg-white p-4 rounded-md shadow-md mb-4`}>
        <Text style={twrnc`text-2xl font-bold text-black`}>Accueil</Text>
        <View style={twrnc`flex-row items-center`}>
        <TouchableOpacity style={twrnc`relative mr-7`}>
  <BellIcon style={twrnc`h-12 w-8`} />
  {notificationCount > 0 && (
    <View style={twrnc`absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center`}>
      <Text style={twrnc`text-white text-xs font-bold`}>{notificationCount}</Text>
    </View>
  )}
</TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Exit Pressed')}>
            <ExitIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={twrnc`flex-grow`} showsVerticalScrollIndicator={false}>
        {/* Card 1: Search */}
        <View style={twrnc`bg-green-100 p-4 rounded-md shadow-md mb-4`}>
          <Text style={twrnc`text-xl font-semibold text-gray-800 mb-2`}>Bienvenue, Utilisateur</Text>
          <TextInput
            placeholder="Trouver un terrain"
            placeholderTextColor="#A0AEC0"
            style={twrnc`bg-white p-4 rounded-full shadow-md h-12`}
          />
        </View>

        {/* Card 2: Exclusive Ads */}
        <View style={twrnc`bg-gray-200 p-4 rounded-md shadow-md mb-4`}>
          <Text style={twrnc`text-xl font-semibold text-gray-800 mb-2`}>Publicités exclusives pour vous</Text>
          <View style={twrnc`bg-white p-4 rounded-md shadow-md`}>
            <Text style={twrnc`text-base text-gray-700`}>Offre spéciale aujourd'hui!</Text>
          </View>
        </View>

        {/* Card 3: List of Stadiums */}
        <View style={twrnc`bg-gray-300 p-4 rounded-md shadow-md`}>
          <View style={twrnc`flex-row justify-between mb-2`}>
            <Text style={twrnc`text-xl font-semibold text-gray-800`}>Liste de terrains</Text>
            <TouchableOpacity onPress={() => console.log('Tous Pressed')}>
              <Text style={twrnc`text-orange-500 font-semibold`}>Tous</Text>
            </TouchableOpacity>
          </View>
          {/* Stadium 1 */}
          <View style={twrnc`bg-white p-4 rounded-md shadow-md mb-4`}>
            <Image 
              source={require('../assets/s1.jpg')} 
              style={twrnc`w-full h-40 rounded-md mb-2`}
              resizeMode="cover"
            />
            <Text style={twrnc`text-lg font-semibold text-gray-800`}>Stade de nantes</Text>
            <Text style={twrnc`text-sm text-gray-600`}> Football</Text>
            <Text style={twrnc`text-sm text-gray-600`}>Coût: 100€/heure</Text>
          </View>

          {/* Stadium 2 */}
          <View style={twrnc`bg-white p-4 rounded-md shadow-md mb-4`}>
            <Image 
              source={require('../assets/s2.jpg')} 
              style={twrnc`w-full h-40 rounded-md mb-2`}
              resizeMode="cover"
            />
            <Text style={twrnc`text-lg font-semibold text-gray-800`}>stade bernabieu</Text>
            <Text style={twrnc`text-sm text-gray-600`}> Football</Text>
            <Text style={twrnc`text-sm text-gray-600`}>Coût: 75€/heure</Text>
          </View>

          {/* Stadium 3 */}
          <View style={twrnc`bg-white p-4 rounded-md shadow-md`}>
            <Image 
              source={require('../assets/s3.jpg')} 
              style={twrnc`w-full h-40 rounded-md mb-2`}
              resizeMode="cover"
            />
            <Text style={twrnc`text-lg font-semibold text-gray-800`}>stade monastir</Text>
            <Text style={twrnc`text-sm text-gray-600`}> Football</Text>
            <Text style={twrnc`text-sm text-gray-600`}>Coût: 50€/heure</Text>
          </View>
        </View>
      </ScrollView>
    
    </View>
  );
}

export default Accueil;
