import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { getMetroRoutes, getRoutes, setSelectedRoute, getSelectedRoute, isGetRoutesSuccessful } from 'ducks/get-routes'
import { loadDirections, getSelectedDirection } from 'ducks/get-directions'
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
  }
  state = {
    routeId: null,
    directionId: null
    }

  componentDidMount () {
    const { getRoutes, router, setSelectedRoute, loadDirections } = this.props
    getRoutes()
    //grab the selected route from url path to retain the state
    if(router.params && router.params.routeId) {
      setSelectedRoute(router.params.routeId)
      loadDirections(router.params.routeId)
      this.setState({ routeId:router.params.routeId, directionId:router.params.directionId})
    }
  
  }


  setSelectedRoute = (event) => {
    const {setSelectedRoute, loadDirections, router} = this.props
    setSelectedRoute(event.target.value)
    loadDirections(event.target.value)
    router.push(`/nexttrip/${event.target.value}`)
  }

  setRoutePath = (path) => {
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
  loadDirections
}
export default connect(mapStateToProps, mapDispatchToProps)(MetroApp)
