import React from 'react'
import'./dropdown.less'

export const DropDown = (props) => {
  return (
    <div>
    <select className="metro-app__dropdown" onChange={props.onChange} value={props.selected}>
        <option className="metro-app__dropdown-item">{ props.default }</option>
        { props.context ==='routes' && props.options.map(route => <option className="metro-app__dropdown-item" key={route.get('RouteId')} value={route.get('RouteId')} >{route.get('Description')}</option>) }
        { props.context ==='directions' && props.options.map(direction => <option className="metro-app__dropdown-item" key={direction.get('DirectionId')} value={direction.get('DirectionId')} >{direction.get('DirectionName')}</option>) }
    </select>
    </div>
  )
}