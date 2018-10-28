import React, { Component } from 'react'
import './styles.css'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      media: []
    }
  }

  componentDidMount() {
    fetch('/media.js')
    .then(res => res.json())
    .then(media => this.setState({media}))
  }

  render () {
    return (
      <div className="main">
        This is the main content
      </div>
    )
  }
}
