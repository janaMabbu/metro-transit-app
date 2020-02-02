import Immutable from 'immutable'

export const getGlobalState = (overrideData = {}) => {
  return Immutable.fromJS({
    metroRoutes: {serverData:[]},
    metroDirections: {serverData:[]},
    metroStops: {serverData:[]}
  })
}

export const getNextActionByType = (actions, type) => {
  let action = actions.shift()
  while (action && action.type !== type) {
    action = actions.shift()
  }
  return action
}
