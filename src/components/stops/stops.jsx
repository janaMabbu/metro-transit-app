import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { getStops, isGetStopsSuccessful } from 'ducks/get-stops'

export class Stops extends PureComponent {
  static propTypes = {
    stops: ImmutablePropTypes.list,
    selectedStop:PropTypes.string,
    setSelectedDirection: PropTypes.func.isRequired,
    isGetStopsSuccessful: PropTypes.bool
  }


  setSelectedStop = (event) => {
    const { setSelectedStop } = this.props
    setSelectedStop(event.target.value)
  }


  render () {
    const { stops } = this.props
    return (
      <Fragment>
       <ul>
        { stops.map(stop => <li key={stop.get('PlaceCode')} value={stop.get('PlaceCode')} >{`${stop.get('PlaceCode')} -- ${stop.get('Description')}`}</li>) }
       </ul>
      </Fragment>
    )
  }

  render () {
    return (
      <Fragment>
       {this.props.isGetStopsSuccessful ? this.renderContent(): this.renderError()}
      </Fragment>
    )
  }

  renderContent = () => {
    const { stops } = this.props
    return (
      <Fragment>
       <ul>
        { stops.map(stop => <li key={stop.get('PlaceCode')} value={stop.get('PlaceCode')} >{`${stop.get('PlaceCode')} -- ${stop.get('Description')}`}</li>) }
       </ul>
      </Fragment>
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
    isGetStopsSuccessful: isGetStopsSuccessful(state)
  }
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Stops)
