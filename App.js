import React from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Container, Header, Body, Title, Left } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants } from 'expo'
import HomeScreen from './containers/HomeScreen'
import NewDeckScreen from './containers/NewDeckScreen'
import DeckScreen from './containers/DeckScreen'
import QuizzScreen from './containers/QuizzScreen'
import AddCardScreen from './containers/AddCardScreen'
import { globalStyles, navigationOptions } from './utils/helpers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { primary, tintColor } from './utils/colors'
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

const StackNav = StackNavigator({
  Home: {
    screen: HomeScreen,
    path: '/',
    navigationOptions: {
      title: 'Decks',
      ...navigationOptions
    }
  },
  Details: {
    screen: DeckScreen,
    path: '/decks/:title',
    navigationOptions
  },
  AddCard: {
    screen: AddCardScreen,
    path: '/decks/:title/add_card',
    navigationOptions
  },
  QuizzView: {
    screen: QuizzScreen,
    path: '/decks/:title/quizz',
    navigationOptions: {
      ...navigationOptions,
      title: 'Quizz'
    }
  }
})

const TabsNav = TabNavigator(
  {
    Home: {
      screen: StackNav,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => {
          return (
            <MaterialCommunityIcons
              name="cards"
              size={globalStyles.icon}
              color={tintColor}
            />
          )
        }
      }
    },
    NewDeck: {
      screen: NewDeckScreen,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => {
          return (
            <MaterialIcons
              name="add"
              size={globalStyles.icon}
              color={tintColor}
            />
          )
        }
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#fff',
      style: {
        backgroundColor: '#3f51b5'
      }
    }
  }
)

const UdaciCardsStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar transluscent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  state = {
    fontLoaded: false
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })

    this.setState({ fontLoaded: true })
  }

  render() {
    return (
      this.state.fontLoaded && (
        <Provider store={store}>
          <Container>
            <UdaciCardsStatusBar
              backgroundColor={primary}
              barStyle="dark-content"
            />
            <TabsNav />
          </Container>
        </Provider>
      )
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
