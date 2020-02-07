import { shallow } from 'enzyme'
import React from 'react'

import AboutNextTrip from 'components/about-next-trip/about-next-trip'

describe('Component - AboutNextTrip', () => {
   beforeEach(() => {
    window.scrollTo = jest.fn()
  })

  it('should render the Header snapshot', () => {
    const wrapper = shallow(<AboutNextTrip />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it should contain sub-header, content, and subcontent', () => {
    const wrapper = shallow(<AboutNextTrip />)
    expect(wrapper.find('.about-us__sub-header').length).toBe(1)
    expect(wrapper.find('.about-us__content').length).toBe(1)
    expect(wrapper.find('.about-us__sub-content').length).toBe(1)
  })

})