import React, { Component } from 'react'
import styles from './styles.scss'
import VolumeSlider from './VolumeSlider/VolumeSlider'

const fabStyle = { marginLeft: '15px', cursor: 'pointer' }

class MediaToggles extends Component {
    componentWillUpdate() {
        console.log('media toggles updating')
    }

    shouldComponentUpdate() {
        return false
    }
    
    render() {
        return (
            <div className={styles.media__toggles}>
                {this.props.showVolumeBar ? (
                    <VolumeSlider volumeLevel={this.props.volumeLevel} updateVolumeLevel={this.props.updateVolumeLevel} />
                ) : null}
                {this.props.showPlaylistToggle ? (
                    <i className="fa fa-list-ol" style={fabStyle} />
                ) : null}
                {this.props.showVisualizerToggle ? (
                    <i className="fab fa-react" style={fabStyle} />
                ) : null}
            </div>
        )
    }
}

export default MediaToggles