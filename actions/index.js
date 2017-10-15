import * as ActionsTypes from './types'
import * as Helpers from '../utils/helpers'

export const getDecks = () => async dispatch => {
  try {
    const decks = await Helpers.getDecks()
    dispatch({ type: ActionsTypes.LIST_DECKS, decks })
  } catch (error) {
    dispatch({ type: ActionsTypes.LIST_DECKS, decks: {} })
    console.error(error)
  }
}

export const addDeck = title => async dispatch => {
  await Helpers.saveDeckTitle(title)
  dispatch({ type: ActionsTypes.ADD_DECK, title })
}

export const addCardToDeck = (title, card) => async dispatch => {
  await Helpers.addCardToDeck(title, card)
  dispatch({ type: ActionsTypes.ADD_CARD, title, card })
}
