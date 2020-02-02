import React from 'react'
import './header.less'

export const Header = () => {
  return (
      <div className="col-sm-12 app-header__content">
        <div className="app-header__logo"></div>
        <div className="app-header__banner" >
          <h1 className="app-header__text">Ready for NexTrip?</h1>
        </div>
      </div>
    )
}