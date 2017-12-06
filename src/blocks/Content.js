import React from 'react'
import classnames from 'classnames'

import Button from './Button'
import ButtonToggle from './ButtonToggle'

function Content(props) {
  return (
    <div className={classnames(props.className)}>
      <div className="button-group button-group_full">
        <ButtonToggle className="button-group__item button-group__item_equal" />
        <ButtonToggle className="button-group__item button-group__item_equal" />
        <ButtonToggle className="button-group__item button-group__item_equal" />
      </div>
    </div>
  )
}

export default Content