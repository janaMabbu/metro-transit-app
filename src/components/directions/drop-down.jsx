import React from 'react'

export const DropDown = (props) => {
  return (
    <select className="select-box" onChange={props.onChange} value={props.selected}>
        <option>{ props.default }</option>
        { props.options.map(direction => <option key={direction.get('DirectionId')} value={direction.get('DirectionId')} >{direction.get('DirectionName')}</option>)}
    </select>
  )
}
