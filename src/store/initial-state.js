import Immutable from 'immutable'

const metroRoutes = { serverData: [] }
const metroDirections = { serverData: [] }
const metroStops = { serverData: [] }

// setting up intial state on app load
export default Immutable.fromJS({
  metroRoutes,
  metroDirections,
  metroStops
})