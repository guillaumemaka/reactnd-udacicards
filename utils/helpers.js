import { StyleSheet, AsyncStorage } from 'react-native'
import { primary, tintColor } from './colors'
export const globalStyles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
})

export const navigationOptions = {
  headerStyle: {
    backgroundColor: primary
  },
  headerTintColor: tintColor
}

export const iconSizes = {
  android: 32,
  ios: 52
}

const DECKS_STORAGE_KEY = 'UdaciCards:Decks'
const DEFAULT_DATA = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export async function getDecks() {
  try {
    let data = await AsyncStorage.getItem(DECKS_STORAGE_KEY)

    if (!data) {
      await AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify(DEFAULT_DATA)
      )
      return DEFAULT_DATA
    }

    return JSON.parse(data)
  } catch (error) {
    console.error(error)
    return DEFAULT_DATA
  }
}

export async function getDeck(id) {
  const decks = await getDecks()

  if (decks[id] === 'undefined') {
    return null
  }

  return decks[id]
}

export async function saveDeckTitle(title) {
  let decks = await getDecks()
  decks = { ...decks, [title]: { title, questions: [] } }
  console.log({ decks })
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
}

export async function addCardToDeck(title, card) {
  let decks = await getDecks()
  decks = {
    ...decks,
    [title]: {
      ...decks[title],
      questions: [...decks[title].questions, card]
    }
  }
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
}
