import { Component } from 'react';
import {
  Platform,
  View,
  Button,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import Home from './HomeComponent';
import QuienesSomos from './QuienesSomosComponent';
import Contacto from './ContactoComponent';

import { EXCURSIONES } from '../comun/excursiones';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={styles.container}
        edges={['left', 'right', 'bottom']}
      >
        <View style={styles.drawerHeader}>
          <View style={styles.drawerHeaderImageContainer}>
            <Image
              source={require('./imagenes/logo.png')}
              style={styles.drawerImage}
            />
          </View>

          <View style={styles.drawerHeaderTextContainer}>
            <Text style={styles.drawerHeaderText}>Gaztaroa</Text>
          </View>
        </View>

        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

class Campobase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      excursiones: EXCURSIONES,
    };
  }

  HomeNavegador = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#015afc' },
          headerTitleStyle: { color: '#fff' },
          headerLeft: () => (
            <Button
              title="☰"
              color="#fff"
              onPress={() => navigation.getParent()?.openDrawer()}
            />
          ),
        })}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Campo Base',
          }}
        />
      </Stack.Navigator>
    );
  };

  CalendarioNavegador = () => {
    return (
      <Stack.Navigator
        initialRouteName="Calendario"
        screenOptions={({ navigation }) => ({
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#015afc' },
          headerTitleStyle: { color: '#fff' },
          headerLeft: () => (
            <Button
              title="☰"
              color="#fff"
              onPress={() => navigation.getParent()?.openDrawer()}
            />
          ),
        })}
      >
        <Stack.Screen
          name="Calendario"
          options={{
            title: 'Calendario Gaztaroa',
          }}
        >
          {(props) => (
            <Calendario
              {...props}
              excursiones={this.state.excursiones}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="DetalleExcursion"
          options={{
            title: 'Detalle Excursión',
            headerBackTitle: 'Calendario',
          }}
        >
          {(props) => (
            <DetalleExcursion
              {...props}
              excursiones={this.state.excursiones}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };

  QuienesSomosNavegador = () => {
    return (
      <Stack.Navigator
        initialRouteName="QuienesSomos"
        screenOptions={({ navigation }) => ({
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#015afc' },
          headerTitleStyle: { color: '#fff' },
          headerLeft: () => (
            <Button
              title="☰"
              color="#fff"
              onPress={() => navigation.getParent()?.openDrawer()}
            />
          ),
        })}
      >
        <Stack.Screen
          name="QuienesSomos"
          component={QuienesSomos}
          options={{
            title: 'Quiénes somos',
          }}
        />
      </Stack.Navigator>
    );
  };

  ContactoNavegador = () => {
    return (
      <Stack.Navigator
        initialRouteName="Contacto"
        screenOptions={({ navigation }) => ({
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#015afc' },
          headerTitleStyle: { color: '#fff' },
          headerLeft: () => (
            <Button
              title="☰"
              color="#fff"
              onPress={() => navigation.getParent()?.openDrawer()}
            />
          ),
        })}
      >
        <Stack.Screen
          name="Contacto"
          component={Contacto}
          options={{
            title: 'Contacto',
          }}
        />
      </Stack.Navigator>
    );
  };

  DrawerNavegador = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Campo base"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#c2d3da',
          },
        }}
      >
        <Drawer.Screen
          name="Campo base"
          component={this.HomeNavegador}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Quiénes somos"
          component={this.QuienesSomosNavegador}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="information"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Calendario"
          component={this.CalendarioNavegador}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Contacto"
          component={this.ContactoNavegador}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="card-account-phone"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };

  render() {
    return (
      <NavigationContainer>
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
          }}
        >
          <this.DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  drawerHeader: {
    backgroundColor: '#015afc',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  drawerHeaderImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  drawerHeaderTextContainer: {
    flex: 2,
    justifyContent: 'center',
  },

  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  drawerImage: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
  },
});

export default Campobase;