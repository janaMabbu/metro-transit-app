import Immutable from 'immutable'
import { callEndpoint } from 'ducks/http'

// REDUCER
// (currentState is this duck's section of the global state)
export const reducer = (currentState = initialState, action) => {
  switch (action.type) {
    case SET_METRO_STOPS:
      return currentState.set('serverData', Immutable.fromJS(action.response))
    case SET_GET_STOPS_SUCCESSFUL:
      return currentState.set('isGetStopsSuccessful', action.isSuccessful)
    default:
      return currentState
  }
}

// ACTION CREATORS
export const setMetroStops = response => ({ type: SET_METRO_STOPS, response })
export const setGetStopsIsSuccessful = isSuccessful => ({ type: SET_GET_STOPS_SUCCESSFUL, isSuccessful })

// ACTION TYPES
export const SET_METRO_STOPS = 'get-stops/set-metro-stop'
export const SET_GET_STOPS_SUCCESSFUL = 'get-stops/set-get-stops-is-successful'

// SELECTORS

export const getStops = state => state.getIn(['metroStops', 'serverData'], Immutable.list)
export const isGetStopsSuccessful = state => state.getIn(['metroStops', 'isGetStopsSuccessful'], true)


// ASYNC FUNCTIONS
export const loadStops = (selectedRoute, selectedDirection) => async (dispatch, getState) => {
  const state = getState()

  try {
    const response = await callEndpoint(`stops\/${selectedRoute}\/${selectedDirection}`)
    if(response) {
      dispatch(getStopsSuccessHandler(response))
    } else {
      dispatch(getStopsFailureHandler())
    }
  } catch (error) {
    dispatch(getStopsFailureHandler())
  }

}

// HANDLERS
export const getStopsSuccessHandler = (response) => (dispatch) => {
  dispatch(setMetroStops(response))
  dispatch(setGetStopsIsSuccessful(true))
}

export const getStopsFailureHandler = () => (dispatch) => {
  dispatch(setGetStopsIsSuccessful(false))
}



// INITIAL STATE
const initialState = Immutable.fromJS({})