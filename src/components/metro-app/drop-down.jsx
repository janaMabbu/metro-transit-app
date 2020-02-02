import React from 'react'

export const DropDown = (props) => {
  return (
    <select className="select-box" onChange={props.onChange} value={props.selected}>
        <option>{ props.default }</option>
        { props.options.map(route => <option key={route.get('RouteId')} value={route.get('RouteId')} >{route.get('Description')}</option>)}
    </select>
  )
}
