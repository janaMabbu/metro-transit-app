import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { getMetroRoutes, getRoutes, setSelectedRoute, getSelectedRoute, isGetRoutesSuccessful } from 'ducks/get-routes'
import { loadDirections, getSelectedDirection, setSelectedDirection } from 'ducks/get-directions'
import { DropDown } from 'components/dropdown/dropdown'
import Directions from 'components/directions'
import Stops from 'components/stops'

import './metro-app.less'

export class MetroApp extends PureComponent {
  static propTypes = {
    metroRoutes: ImmutablePropTypes.list,
    selectedRoute:PropTypes.string,
    selectedDirection: PropTypes.string,
    isGetRoutesSuccessful: PropTypes.bool,
    getRoutes: PropTypes.func.isRequired,
    setSelectedRoute: PropTypes.func.isRequired,
    loadDirections: PropTypes.func.isRequired,
    setSelectedDirection: PropTypes.func.isRequired,
  }
  state = {
    routeId: null,
    directionId: null
    }

  componentDidMount () {
    const { getRoutes, router, setSelectedRoute, loadDirections } = this.props
    getRoutes()
    // scrolling to top on browser navigation
    window.scrollTo(0, 0)
    //grab the selected route from url path to retain the state
    if(router.params && router.params.routeId) {
      setSelectedRoute(router.params.routeId)
      loadDirections(router.params.routeId)
      this.setState({ routeId:router.params.routeId, directionId:router.params.directionId})
    }
  
  }


  setSelectedRoute = (event) => {
    const {setSelectedRoute, loadDirections, router, setSelectedDirection} = this.props
    // not trigger anything if user selects the default option
    if(event.target.value != 'Select a Route') {
      // this hides the stops and resets the direction dropdown to set to default
      setSelectedDirection('')
      // this loads the directions for the slected route
      loadDirections(event.target.value)

      // this updates the selected route
      setSelectedRoute(event.target.value)
      // pushing to the next page, but it renders the same component
      router.push(`/nexttrip/${event.target.value}`)
    }
  }

  setRoutePath = (path) => {
    // this navigated the user to next page
    this.props.router.push(path)
  }

  navigateToAboutUs = () => {
    this.setRoutePath('about-us')
  }

  navigateToConatctUS = () => {
    this.setRoutePath('contact-us')
  }



  render () {
    return (
        <div className="row metro-app">
        <div className="col-sm-8">
             <div>{ this.props.isGetRoutesSuccessful ? this.renderMainContent(): this.renderError() } </div>
        </div>
        <div className="col-sm-4">
            <div> { this.renderContent2() } </div>
        </div>
        </div>
    )
  }

  renderMainContent = () => {
    const { metroRoutes, selectedRoute, selectedDirection } = this.props
    const { routeId, directionId } = this.state
    return(
      <div className="metro-app__content1">
        <h2 className="metro-app-container__title"> Real-time Departures</h2>
        <DropDown context= "routes" default ="Select a Route" options= {metroRoutes} onChange = {this.setSelectedRoute} selected ={selectedRoute} />
        { selectedRoute && <Directions routeId={ routeId } directionId= {directionId}  setRoutePath={ this.setRoutePath} /> }
        { (selectedRoute && selectedDirection) && <Stops/> }
      </div>
    )
  }
  renderContent2 = () => {
    return(
      <div className="metro-app__content2">
        <button className="btn btn-outline-primary metro-app__button" onClick={ this.navigateToAboutUs }>About Us</button>
        <button className="btn btn-outline-primary metro-app__button" onClick={ this.navigateToConatctUS }>contact Us</button>
      </div>
    )
  }
  renderError = () => {
     return(
      <Fragment>
        something went wrong loading the Metro Routes!!!
      </Fragment>
    )
  }

}
const mapStateToProps = state => {
  return {
    metroRoutes: getMetroRoutes(state),
    selectedRoute: getSelectedRoute(state),
    selectedDirection: getSelectedDirection(state),
    isGetRoutesSuccessful: isGetRoutesSuccessful(state)
  }
}
const mapDispatchToProps = {
  getRoutes,
  setSelectedRoute,
  loadDirections,
  setSelectedDirection
}
export default connect(mapStateToProps, mapDispatchToProps)(MetroApp)
