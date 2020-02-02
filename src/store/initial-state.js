import Immutable from 'immutable'

const metroRoutes = { serverData: [] }
const metroDirections = { serverData: [] }
const metroStops = { serverData: [] }

export default Immutable.fromJS({
  metroRoutes,
  metroDirections,
  metroStops
})