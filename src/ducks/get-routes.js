import Immutable from 'immutable'
import { callEndpoint } from 'ducks/http'

// REDUCER
// (currentState is this duck's section of the global state)
export const reducer = (currentState = initialState, action) => {
  switch (action.type) {
    case SET_METRO_ROUTES:
      return currentState.set('serverData', Immutable.fromJS(action.response))
    case SET_GET_ROUTES_SUCCESSFUL:
      return currentState.set('isGetRoutesSuccessful', action.isSuccessful)
    case SET_SELECTED_ROUTE:
      return currentState.set('selectedRoute', action.route)
    default:
      return currentState
  }
}

// ACTION CREATORS
export const setMetroRoutes = response => ({ type: SET_METRO_ROUTES, response })
export const setSelectedRoute = route => ({ type: SET_SELECTED_ROUTE, route })
export const setGetRoutesIsSuccessful = isSuccessful => ({ type: SET_GET_ROUTES_SUCCESSFUL, isSuccessful })

// ACTION TYPES
export const SET_METRO_ROUTES = 'get-routes/set-metro-routes'
export const SET_GET_ROUTES_SUCCESSFUL = 'get-routes/set-get-routes-is-successful'
export const SET_SELECTED_ROUTE = 'get-routes/set-selected-route'

// SELECTORS

export const getMetroRoutes = state => state.getIn(['metroRoutes', 'serverData'], Immutable.list)
export const getSelectedRoute = state => state.getIn(['metroRoutes', 'selectedRoute'], '')
export const isGetRoutesSuccessful = state => state.getIn(['metroRoutes', 'isGetRoutesSuccessful'], true)


// ASYNC FUNCTIONS
export const getRoutes = () => async (dispatch, getState) => {
  const state = getState()

  if (!getMetroRoutes(state).isEmpty()) {
    // check if metro routes exists in redux store already and not trigger a service call
    return
  }

  try {
    const response = await callEndpoint('routes')
    if(response) {
      dispatch(getRoutesSuccessHandler(response))
    } else {
      dispatch(getRoutesFailureHandler())
    }
  } catch (error) {
    dispatch(getRoutesFailureHandler())
  }

}

// HANDLERS
export const getRoutesSuccessHandler = (response) => (dispatch) => {
  dispatch(setMetroRoutes(response))
  dispatch(setGetRoutesIsSuccessful(true))
}

export const getRoutesFailureHandler = () => (dispatch) => {
  dispatch(setGetRoutesIsSuccessful(false))
}



// INITIAL STATE
const initialState = Immutable.fromJS({})