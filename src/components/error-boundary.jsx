import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

export class ErrorBoundary extends Component {
  static propTypes = {
    isDevelopment: PropTypes.bool.isRequired
  }

  state = { hasError: false }

  render () {
    if (this.state.hasError) {
        return (
          <div style={{ border: '2px solid tomato', padding: '15px' }}>
            <h2>Oops, something went wrong with Metro App </h2>
            <h3>{ get(this.props, 'children.type.displayName', 'It') } has crashed.</h3>
          </div>
        )
    } else {
      return this.props.children
    }
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true })
  }
}

export default ErrorBoundary
