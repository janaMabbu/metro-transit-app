import { reducer as metroRoutes } from 'ducks/get-routes'
import { reducer as metroDirections } from 'ducks/get-directions'
import { reducer as metroStops } from 'ducks/get-stops'


export default (state, action) => {

  const reducers = {
    metroRoutes,
    metroDirections,
    metroStops
  }
  return Object.entries(reducers).reduce((state, [ name, reducer ]) =>
      state.set(name, reducer(state.get(name), action, state)), state)
}
