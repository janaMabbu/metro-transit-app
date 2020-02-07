import { shallow } from 'enzyme'
import React from 'react'

import ContactUs from 'components/contact-us/contact-us'

describe('Component - ContactUs', () => {

  beforeEach(() => {
    window.scrollTo = jest.fn()
  })

  it('should render the Header snapshot', () => {
    const wrapper = shallow(<ContactUs />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it should contain sub-header, content, and subcontent', () => {
    const wrapper = shallow(<ContactUs />)
    expect(wrapper.find('.contact-us__sub-header').length).toBe(1)
    expect(wrapper.find('.contact-us__content').length).toBe(1)
    expect(wrapper.find('.contact-us__sub-content').length).toBe(1)
  })

})