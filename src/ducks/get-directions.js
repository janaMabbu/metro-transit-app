import Immutable from 'immutable'
import { callEndpoint } from 'ducks/http'

// REDUCER
// (currentState is this duck's section of the global state)
export const reducer = (currentState = initialState, action) => {
  switch (action.type) {
    case SET_METRO_DIRECTIONS:
      return currentState.set('serverData', Immutable.fromJS(action.response))
    case SET_GET_DIRECTIONS_SUCCESSFUL:
      return currentState.set('isGetDirectionsSuccessful', action.isSuccessful)
    case SET_SELECTED_DIRECTION:
      return currentState.set('selectedDirection', action.direction)
    default:
      return currentState
  }
}

// ACTION CREATORS
export const setMetroDirections = response => ({ type: SET_METRO_DIRECTIONS, response })
export const setSelectedDirection = direction => ({ type: SET_SELECTED_DIRECTION, direction })
export const setGetDirectionsIsSuccessful = isSuccessful => ({ type: SET_GET_DIRECTIONS_SUCCESSFUL, isSuccessful })

// ACTION TYPES
export const SET_METRO_DIRECTIONS = 'get-directions/set-metro-directions'
export const SET_GET_DIRECTIONS_SUCCESSFUL = 'get-directions/set-get-directions-is-successful'
export const SET_SELECTED_DIRECTION = 'get-directions/set-selected-direction'

// SELECTORS

export const getDirections = state => state.getIn(['metroDirections', 'serverData'], Immutable.list)
export const getSelectedDirection = state => state.getIn(['metroDirections', 'selectedDirection'], '')
export const isGetDirectionsSuccessful = state => state.getIn(['metroDirections', 'isGetDirectionsSuccessful'], false)


// ASYNC FUNCTIONS
export const loadDirections = (selectedRoute) => async (dispatch, getState) => {
  const state = getState()

  try {
    const response = await callEndpoint(`directions\/${selectedRoute}`)
    if(response) {
      dispatch(getDirectionsSuccessHandler(response))
    } else {
      dispatch(getDirectionsFailureHandler())
    }
  } catch (error) {
    dispatch(getDirectionsFailureHandler())
  }

}

// HANDLERS
export const getDirectionsSuccessHandler = (response) => async (dispatch) => {
  dispatch(setMetroDirections(response))
  dispatch(setGetDirectionsIsSuccessful(true))
}

export const getDirectionsFailureHandler = () => (dispatch) => {
  dispatch(setGetDirectionsIsSuccessful(false))
}



// INITIAL STATE
const initialState = Immutable.fromJS({})