import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { getDirections, setSelectedDirection, getSelectedDirection, isGetDirectionsSuccessful } from 'ducks/get-directions'
import { getSelectedRoute } from 'ducks/get-routes'
import { loadStops } from 'ducks/get-stops'
import { DropDown } from 'components/dropdown/dropdown'

export class Directions extends PureComponent {
  static propTypes = {
    routeId:PropTypes.string,
    directionId:PropTypes.string,
    directions: ImmutablePropTypes.list,
    selectedRoute:PropTypes.string,
    selectedDirection:PropTypes.string,
    setRoutePath: PropTypes.func.isRequired,
    setSelectedDirection: PropTypes.func.isRequired,
    isGetDirectionsSuccessful: PropTypes.bool
  }

  componentDidMount () {
    const { routeId, directionId, setSelectedDirection, loadStops } = this.props
    //logic to retain the state on reload
    if(directionId) {
      setSelectedDirection(directionId)
    }
    if(directionId && routeId) {
      loadStops(routeId, directionId)
    }

  }


  setSelectedDirection = (event) => {
    const { setSelectedDirection, loadStops, selectedRoute, setRoutePath } = this.props
    setSelectedDirection(event.target.value)
    loadStops(selectedRoute, event.target.value)
    setRoutePath(`/nexttrip/${selectedRoute}/${event.target.value}`)
  }


  render () {
    return (
      <Fragment>
       {this.props.isGetDirectionsSuccessful ? this.renderContent(): this.renderError()}
      </Fragment>
    )
  }

  renderContent = () => {
    const { directions, selectedDirection } = this.props
    return <DropDown context="directions" default ="Select a Direction" options= {directions} onChange = {this.setSelectedDirection} selected ={selectedDirection} />
  }

  renderError = () => {
     return(
      <Fragment>
        something went wrong loading the directions for the route, please reselct the route from the dropdown!!!
      </Fragment>
    )
  }

}
const mapStateToProps = state => {
  return {
    directions: getDirections(state),
    selectedDirection: getSelectedDirection(state),
    selectedRoute: getSelectedRoute(state),
    isGetDirectionsSuccessful: isGetDirectionsSuccessful(state)
  }
}
const mapDispatchToProps = {
  loadStops,
  setSelectedDirection
}
export default connect(mapStateToProps, mapDispatchToProps)(Directions)
