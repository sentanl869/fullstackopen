import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={`notification ${message.type}`}>
      {message.content}
    </div>
  )
}

Notification.prototype = {
  message: PropTypes.object.isRequired
}

export default Notification