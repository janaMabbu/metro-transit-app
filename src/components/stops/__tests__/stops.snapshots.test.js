import { shallow, mount } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import { Stops } from 'components/stops/stops'

describe('Component - Stops', () => {
  let props
  const stops = [
    {
      'PlaceCode': 'PlaceCode1',
      'Description': 'Description'
    },
     {
      'PlaceCode': 'PlaceCode2',
      'Description': 'Description11'
    },
     {
      'PlaceCode': 'PlaceCode3',
      'Description': 'Description22'
    },
      {
      'PlaceCode': 'PlaceCode4',
      'Description': 'Description'
    },
     {
      'PlaceCode': 'PlaceCode5',
      'Description': 'Description11'
    },
     {
      'PlaceCode': 'PlaceCode6',
      'Description': 'Description22'
    },
  ]
  beforeEach(() => {
    props = {
      stops: Immutable.fromJS(stops),
      selectedRoute:'xyz',
      selectedRoute:'abc',
      isGetStopsSuccessful: true
    }
  })
  it('should render the Stops snapshot', () => {
    const wrapper = shallow(<Stops {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the Stops fallback', () => {
    const wrapper = shallow(<Stops {...props} />)
    wrapper.setProps({ isGetStopsSuccessful: false })
    expect(wrapper.contains('something went wrong loading the directions for the stops, please reselct the direction and route from the dropdown!!!')).toBe(true)
  })

  it('should only display first four stops', () => {
    const wrapper = shallow(<Stops {...props}/>)
    expect(wrapper.find('.stops-container__stop-description').length).toBe(4)
  })

  it('should only all first 6 stops on click on showmore and 4 on clicck of showless', () => {
    const wrapper = shallow(<Stops {...props}/>)
    wrapper.find('.stops-container__button').first().simulate('click')
    expect(wrapper.find('.stops-container__stop-description').length).toBe(6)
    wrapper.find('.stops-container__button').first().simulate('click')
    expect(wrapper.find('.stops-container__stop-description').length).toBe(4)
  })

})