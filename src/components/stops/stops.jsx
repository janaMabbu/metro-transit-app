import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { getStops, isGetStopsSuccessful } from 'ducks/get-stops'
import { getSelectedDirection } from 'ducks/get-directions'
import { getSelectedRoute } from 'ducks/get-routes'
import './stops.less'

export class Stops extends PureComponent {
  static propTypes = {
    stops: ImmutablePropTypes.list,
    selectedRoute:PropTypes.string,
    selectedDirection: PropTypes.string,
    isGetStopsSuccessful: PropTypes.bool
  }

  state = {
    count: 4,
    stopsContainerExpanded: false
  }

  manageCount = () => {
    if(this.state.count === 4 ){
      this.setState({ count: this.props.stops.size, stopsContainerExpanded: true })
    } else {
      this.setState({ count: 4, stopsContainerExpanded: false })
    }
  }

  render () {
    return (
      <Fragment>
       {this.props.isGetStopsSuccessful ? this.renderContent(): this.renderError()}
      </Fragment>
    )
  }

  renderContent = () => {
    const { stops, selectedRoute, selectedDirection } = this.props
    return (
      <div className="stops-container">
        <div className="stops-container__info">
          <h2 className="stops-container__title">Stops</h2>
          <div>RouteId: { selectedRoute }</div>
          <div>DirectionId: { selectedDirection }</div>
        </div>
        { stops.slice(0, this.state.count).map(stop => {
          return (
            <div role="list" className="stops-container__list" key={ stop.get('PlaceCode') }>
         <div className="stops-container__stop-description">
          <span><strong>{ stop.get('PlaceCode') } </strong></span>
          <span>{ stop.get('Description' )}</span>
         </div>
        </div>
          )
        })}
        { stops.size > 4 && 
          <button className="stops-container__button" onClick={this.manageCount}>
          <span className={this.state.stopsContainerExpanded ? 'stops-container__expand': 'stops-container__closed'}></span>
            Show {this.state.stopsContainerExpanded ? 'less' : 'more'} Stops
            </button>
          }
      </div>
    )
  }

  renderError = () => {
     return(
      <Fragment>
        something went wrong loading the directions for the stops, please reselct the direction and route from the dropdown!!!
      </Fragment>
    )
  }

}
const mapStateToProps = state => {
  return {
    stops: getStops(state),
    isGetStopsSuccessful: isGetStopsSuccessful(state),
    selectedDirection: getSelectedDirection(state),
    selectedRoute: getSelectedRoute(state)
  }
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Stops)
