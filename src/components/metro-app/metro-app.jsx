import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { getMetroRoutes, getRoutes, setSelectedRoute, getSelectedRoute, isGetRoutesSuccessful } from 'ducks/get-routes'
import { loadDirections, getSelectedDirection } from 'ducks/get-directions'
import { DropDown } from 'components/metro-app/drop-down'
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



  render () {
    return (
      <div className="metro-app__main-container">
       {this.props.isGetRoutesSuccessful ? this.renderContent(): this.renderError()}
      </div>
    )
  }

  renderContent = () => {
    const { metroRoutes, selectedRoute, selectedDirection } = this.props
    const { routeId, directionId } = this.state
    return(
      <Fragment>
        <DropDown default ="Select a Route" options= {metroRoutes} onChange = {this.setSelectedRoute} selected ={selectedRoute} />
        { selectedRoute && <Directions routeId={ routeId } directionId= {directionId}  setRoutePath={ this.setRoutePath} /> }
        { (selectedRoute && selectedDirection) && <Stops/> }
      </Fragment>
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
