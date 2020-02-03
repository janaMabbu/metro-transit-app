import React, { PureComponent } from 'react'
import { IndexRedirect, Route, Redirect } from 'react-router'
import MetroApp from 'components/metro-app'
import AboutNextTrip from 'components/about-next-trip'
import ContactUs from 'components/contact-us/contact-us'
import { Header } from 'components/header/header'
import { Footer } from 'components/footer/footer'

export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRedirect to="nexttrip" />
      <Route path="about-us" component={ AboutNextTrip } />
      <Route path="contact-us" component={ ContactUs } />
      <Route path="nexttrip" component={ MetroApp } />
      <Route path="nexttrip/:routeId" component={ MetroApp } />
      <Route path="nexttrip/:routeId/:directionId" component={ MetroApp } />
      <Redirect from="*" to={ '/' } />
    </Route>
  )
}


export class App extends PureComponent {
    render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Header/>
        </div>
          {this.props.children}
        <div className="row">
          <Footer/>
        </div>
      </div>
      )
  }

}
