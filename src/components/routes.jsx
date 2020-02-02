import React, { PureComponent } from 'react'
import { IndexRedirect, Route, Redirect } from 'react-router'
import MetroApp from 'components/metro-app'
import AboutNextTrip from 'components/about-next-trip'

export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRedirect to="nexttrip" />
      <Route path="about-us" component={ AboutNextTrip } />
      <Route path="contact-us" component={ AboutNextTrip } />
      <Route path="nexttrip" component={ MetroApp } />
      <Route path="nexttrip/:routeId" component={ MetroApp } />
      <Route path="nexttrip/:routeId/:directionId" component={ MetroApp } />
      <Redirect from="*" to={ '/' } />
    </Route>
  )
}


export class App extends PureComponent {
    render() {
    return this.props.children
  }

}
