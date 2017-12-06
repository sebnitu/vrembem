import React from 'react'
import classnames from 'classnames'
import Button from './Button'

class ButtonToggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      className: props.className,
      isToggleOn: true,
      onText: props.onText,
      offText: props.offText
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={classnames('button', this.state.className, this.state.isToggleOn ? 'is-on' : 'is-off')}
      >
        {this.state.isToggleOn ? this.state.onText : this.state.offText}
      </button>
    )
  }
}

ButtonToggle.defaultProps = {
  onText: 'On',
  offText: 'Off'
};

export default ButtonToggle
