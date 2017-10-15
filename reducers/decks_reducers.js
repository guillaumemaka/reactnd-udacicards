import * as ActionsTypes from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case ActionsTypes.LIST_DECKS:
      return { ...state, ...action.decks }
    case ActionsTypes.ADD_DECK: {
      return {
        ...state,
        [action.title]: { title: action.title, questions: [] }
      }
    }
    case ActionsTypes.ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.card]
        }
      }
    default:
      return state
  }
}
