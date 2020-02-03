import React, { PureComponent, Fragment } from 'react'
import './about-next-trip.less'

export default class AboutNextTrip extends PureComponent {

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <header className="about-us">
        <div className="about-us__sub-header">
          <strong>About Nextrip!</strong>
        </div>
        <div className="about-us__content">
          <div className="about-us__sub-content">
            <h2>
              Stay in the know with NexTrip
            </h2>
            <p>
              No need to guess when your next bus or train will depart.* NexTrip gets you what you need, right now!
            </p>
            <h2>
              How it works
            </h2>
            <p>
              Every bus and train has an onboard computer that tracks its GPS location. As it travels along a route, NexTrip tracks its location in relation to specific timepoints. It updates automatically every few seconds.
            </p>
            <p>
            If a bus is expected – based on its current travel speed – to leave a stop within the next 20 minutes, NexTrip displays this icon  along with the number of minutes to departure (i.e., 6 Min). Outside the 20-minute window, NexTrip displays scheduled times (i.e., 2:17). Note: Always arrive at the stop at least 5 minutes before the scheduled time.
            </p>
            <p>
            Because NexTrip tracks location based on stops along the route, if a bus has to make an unexpected detour off its regular route – for example, to avoid an obstruction or congestion – it will not be displayed in NexTrip. Until the bus returns to its regular route, NexTrip will display only scheduled times.
            </p>
            <p>
              * Departure times are estimates. Buses and trains are subject to delays based on traffic and other conditions. Always arrive at your stop 5 minutes before the NexTrip or scheduled time.
            </p>
            <h2>
              Stay in the know with NexTrip
            </h2>
            <p>
              No need to guess when your next bus or train will depart.* NexTrip gets you what you need, right now!
            </p>
            <h2>
              How it works
            </h2>
            <p>
              Every bus and train has an onboard computer that tracks its GPS location. As it travels along a route, NexTrip tracks its location in relation to specific timepoints. It updates automatically every few seconds.
            </p>
            <p>
            If a bus is expected – based on its current travel speed – to leave a stop within the next 20 minutes, NexTrip displays this icon  along with the number of minutes to departure (i.e., 6 Min). Outside the 20-minute window, NexTrip displays scheduled times (i.e., 2:17). Note: Always arrive at the stop at least 5 minutes before the scheduled time.
            </p>
            <p>
            Because NexTrip tracks location based on stops along the route, if a bus has to make an unexpected detour off its regular route – for example, to avoid an obstruction or congestion – it will not be displayed in NexTrip. Until the bus returns to its regular route, NexTrip will display only scheduled times.
            </p>
            <p>
              * Departure times are estimates. Buses and trains are subject to delays based on traffic and other conditions. Always arrive at your stop 5 minutes before the NexTrip or scheduled time.
            </p>
          </div>
        </div>
      </header>
    )
  }

}