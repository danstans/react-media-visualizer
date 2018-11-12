# react-media-visualizer

> global media player component for react

[![NPM](https://img.shields.io/npm/v/react-media-visualizer.svg)](https://www.npmjs.com/package/react-media-visualizer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```bash
npm install --save react-media-visualizer

or

yarn add react-media-visualizer
```

## Usage

```jsx
import React, { Component } from 'react'
import ReactMediaVisualizer from 'react-media-visualizer'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      playlistIsPlaying: false,
      currentSongIndex: 0,
      theme: 'soundcloud'
    }
    this.receiveStateUpdates = this.receiveStateUpdates.bind(this)
  }

  render() {
    return (
      <React.Fragment>
        <div className="content">
          Wrap the content of your webpage in here
        </div>
        <ReactMediaVisualizer
          playlist={this.state.playlist}
          receiveStateUpdates={this.receiveStateUpdates}
          playlistIsPlaying={this.state.playlistIsPlaying}
          theme={this.state.theme}
          currentSongIndex={this.state.currentSongIndex} />
      </React.Fragment>
    )
  }

  receiveStateUpdates(payload) {
    if (payload.theme) {
      switch (payload.theme) {
        case 'spotify':
          root.style.setProperty('--content-height', '82px')
          break
        case 'youtube':
          root.style.setProperty('--content-height', '72px')
          break
        case 'soundcloud':
          root.style.setProperty('--content-height', '48px')
          break
        default:
          break
      }
    }
    this.setState(payload)
  }
}

```

## Properties

RMV contains these props, it is important to configure the application similar to the example.

| Name | Description | Default | Required |
| --- | --- | --- | --- |
| `playlist` | Array containing strings (href) to the song source. | Empty array | Yes |
| `currentSongIndex` | The current song index of `playlist`. | null | Yes |
| `playlistIsPlaying` | True/False value controlling whether the music is playing. This value will update in receivestateUpdates(). | false | Yes |
| `showVolumeBar` | True/False value controlling whether to show the volume bar. | true | No |
| `showVisualizerToggle` | True/False value controlling whether to show the visualizer button. | true | No |
| `showPlaylistToggle` | True/False value controlling whether to show the playlist button. | true | No |
| `theme`|The theme to be used, value include 'spotify', 'soundcloud', 'youtube', 'apple'|'soundcloud'|No|
| `receiveStateUpdates` | Function which receives state updates from child components. Check example how to structure it. | null | Yes |


## License

MIT © [danstans](https://github.com/danstans)
