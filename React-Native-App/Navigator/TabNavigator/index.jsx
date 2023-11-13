import React, { useEffect } from 'react'
import { BackHandler, Alert } from 'react-native'
import OpenModalButton from './components/OpenModalButton'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importe os componentes de tela que você deseja navegar
import ListRoomsScreen from '../../screens/ListRoomsScreen'
import SecondScreen from '../../screens/SecondScreen'
import ThirdScreen from '../../screens/ThirdScreen'
import RoomDetailsScreen from '../../screens/RoomDetailsScreen'
import ListPendingScreen from '../../screens/ListPendingScreen'


const Tab = createMaterialTopTabNavigator();

function TabNavigatorComponent() {

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Fechar o aplicativo', 'Tem certeza que deseja fechar o aplicativo?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const Stack = createNativeStackNavigator();

  function RoomsStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ListaDeSalas" component={ListRoomsScreen} options={{title: 'Minhas Salas'}} />
        <Stack.Screen name="DetalhesDaSala" component={RoomDetailsScreen} options={{title: 'Grupo X'}} />
        <Stack.Screen name="ListaDePendentes" component={ListPendingScreen} options={{title: 'Pendentes'}} />
        {/* Adicione outras telas que deseja navegar aqui, se necessário */}
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer independent={true}>
      <RoomsStack />
      {/*<Tab.Navigator initialRouteName="Grupos" tabBarPosition="bottom">

         <Tab.Screen name="Grupos" component={RoomsStack} options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          )
        }} /> 

      </Tab.Navigator>*/}
      <OpenModalButton />
    </NavigationContainer>
  )
}

export default TabNavigatorComponent;