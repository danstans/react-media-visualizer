# react-media-visualizer

> global media player component for react

[![NPM](https://img.shields.io/npm/v/react-media-visualizer.svg)](https://www.npmjs.com/package/react-media-visualizer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-media-visualizer
```

## Usage

```jsx
import React, { Component } from 'react'

import ReactMediaVisualizer from 'react-media-visualizer'
import Main from './components/Main'
import Navbar from './components/Navbar'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [
        'static/Give%20Life%20Back%20to%20Music.mp3',
        'static/The%20Game%20of%20Love.mp3',
        'static/Giorgio%20by%20Moroder.mp3',
        'static/Within.mp3',
        'static/Instant Crush.mp3',
        'static/Lose Yourself To Dance.mp3',
        'static/Touch (feat. Paul Williams).mp3',
        'static/Get Lucky (feat. Pharrell Williams).mp3',
        'static/Beyond.mp3',
        'static/Motherboard.mp3',
        'static/Fragments of Time (feat. Todd Edwards).mp3',
        'static/Doin\' It Right (feat. Panda Bear).mp3',
        'static/Contact.mp3',
        'static/Horizon.mp3'
      ],
      currentSongIndex: 0
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="content">
          <Navbar />
          <Main />
        </div>
        <ReactMediaVisualizer
          playlist={this.state.playlist}
          currentSongIndex={this.state.currentSongIndex} />
      </React.Fragment>
    )
  }
}

```

## License

MIT © [danstans](https://github.com/danstans)
