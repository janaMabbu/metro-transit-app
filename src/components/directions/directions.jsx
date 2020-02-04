import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
    isGetDirectionsSuccessful: PropTypes.bool,
    loadStops: PropTypes.func.isRequired
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
    // not trigger anything if user selects the default option by mistake
      if(event.target.value != 'Select a Direction') {
        setSelectedDirection(event.target.value)
        loadStops(selectedRoute, event.target.value)
        setRoutePath(`/nexttrip/${selectedRoute}/${event.target.value}`)
    }
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
