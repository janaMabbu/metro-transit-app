import { shallow, mount } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import { Directions } from 'components/directions/directions'

describe('Component - Directions', () => {
  let props
  const directions = [
    {
      'DirectionId': 'DirectionId1',
      'DirectionName': 'DescriptionName1'
    },
      {
      'DirectionId': 'DirectionId2',
      'DirectionName': 'DescriptionName2'
    },
     {
      'DirectionId': 'DirectionId3',
      'DirectionName': 'DescriptionName3'
    },
     {
      'DirectionId': 'DirectionId4',
      'DirectionName': 'DescriptionName4'
    }
  ]
  beforeEach(() => {
    props = {
      routeId:'abc',
      directionId:'123',
      directions: Immutable.fromJS(directions),
      selectedRoute:'string',
      selectedDirection:'string',
      setRoutePath: Jest.fn(),
      setSelectedDirection: Jest.fn(),
      isGetDirectionsSuccessful: true,
      loadStops: Jest.fn(),
    }
  })
  it('should render the Directions snapshot', () => {
    const wrapper = shallow(<Directions {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the Directions fallback', () => {
    const wrapper = shallow(<Directions {...props} />)
    wrapper.setProps({ isGetDirectionsSuccessful: false })
    expect(wrapper.contains('something went wrong loading the directions for the route, please reselct the route from the dropdown!!!')).toBe(true)
  })

  it('it should set the correct directionId and load the stops', () => {
    const wrapper = shallow(<Directions {...props} />)
    expect(setSelectedDirection).toBeCalledWith('123')
    expect(loadStops).toBeCalledWith('abc','123')
  })

})