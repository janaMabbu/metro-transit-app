import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import { DropDown } from 'components/dropdown/dropdown'

describe('Component - DropDown', () => {
  let props
  const dropDownMockData = [
    {
      'RouteId': '1',
      'Description': 'Description'
    },
     {
      'RouteId': '2',
      'Description': 'Description11'
    },
     {
      'RouteId': '3',
      'Description': 'Description22'
    },
  ]
  beforeEach(() => {
    props = {
      options: Immutable.fromJS(dropDownMockData),
      context:'routes',
      default:'default',
      onChange: jest.fn()
    }
  })
  it('should render the DropDown snapshot', () => {
    const wrapper = shallow(<DropDown {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it should have correct nummber of options', () => {
    const wrapper = shallow(<DropDown {...props} />)
    expect(wrapper.find('.metro-app__dropdown-item').length).toBe(4)
    dropDownMockData.pop()
    wrapper.setProps({ options: Immutable.fromJS(dropDownMockData) })
    expect(wrapper.find('.metro-app__dropdown-item').length).toBe(3)
  })

})