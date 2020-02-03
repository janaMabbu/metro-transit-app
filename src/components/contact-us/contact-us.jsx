import React, { PureComponent, Fragment } from 'react'
import './contact-us.less'

export default class ContactUs extends PureComponent {

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className="contact-us">
        <div className="contact-us__sub-header">
          <strong>Contact us:</strong>
        </div>
        <div className="contact-us__content">
          <div className="contact-us__sub-content">
            <h2>
              Phone
            </h2>
            <h2>
              612-373-3333
            </h2>
            <p>
              One number to reach all Metro Transit services
            </p>
            <h2>
              NexTrip
            </h2>
            <p>
             NexTrip provides automated, real-time information 24 hours a day for trips departing in the next 20 minutes and scheduled times thereafter. You can also access it at metrotransit.org/nextrip.
            </p>
            <h2>
              Transit Information Center
            </h2>
            <p>
             Speak with a transit expert about routes, schedules and fares. Open 6:30 a.m. to 9 p.m. weekdays and 8 a.m. to 4:30 p.m. on weekends and holidays. Closed Thanksgiving Day and Christmas Day. 
            </p>
            <h2>
             Customer Relations
            </h2>
            <p>
             Customer Relations staff are available to answer questions and take comments Monday through Friday from 8 a.m. to 4:30 p.m. 
            </p>
            <h2>
              Lost & Found
            </h2>
            <p>
              Talk to a Customer Relations specialist to report items left on a bus or train. If staff locate the item, they will mail it to you or make arrangements for you to pick it up at Metro Transit (570 Sixth Avenue North, Minneapolis see map).
            </p>
            <hr/>
            <h2>
              Text
            </h2>
            <h2>
              612-444-1161
            </h2>
            <p> Text for Transit Information </p>
            <p>
             Help us test our new Text for Transit Info program. Monday through Friday between the hours of 8 a.m. and 4:30 p.m., text your general transit questions or trip planning requests to 612-444-1161, and a transit expert will get back to you within minutes with the answers. 
            </p>
            <p>
              Thank you for helping us test this new service!
            </p>
          </div>
        </div>
      </div>
    )
  }

}