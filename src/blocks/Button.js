import React from 'react'
import classnames from 'classnames'

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.children,
      className: this.props.className,
      onClick: this.props.onClick
    }
  }

  render() {
    return (
      <button onClick={this.state.onClick} className={classnames('button', this.state.className)}>
        {this.state.text}
      </button>
    )
  }
}

export default Button
