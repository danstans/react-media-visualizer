import React, { Component } from 'react'
import styles from './styles.scss'

class AudioMeta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            metaPlaylist: props.metaPlaylist,
            currentSongIndex: props.currentSongIndex,
        }
        this.convertBlobToURL = this.convertBlobToURL.bind(this)
        this.getCurrentObject = this.getCurrentObject.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState(nextProps)
        }
    }

    render() {
        if (this.state.currentSongIndex !== null && this.state.metaPlaylist && this.state.metaPlaylist.length > 0) {
            return (
                <div className={styles.meta}>
                    <div className={styles.meta__img}>
                        <img src={this.convertBlobToURL(this.state.metaPlaylist[this.state.currentSongIndex].picture)} alt={this.state.metaPlaylist[this.state.currentSongIndex].title} />
                    </div>
                    <div className={styles.meta__tags}>
                        <span className={styles.meta__tags__title}>{this.getCurrentObject()[0].title}</span>
                        <span className={styles.meta__tags__artist}>{this.getCurrentObject()[0].artist}</span>
                    </div>
                </div>
            )
        } else return <div className={styles.meta}></div>
    }

    getCurrentObject() {
        let currentSongIndex = this.state.currentSongIndex
        let currentObject = this.state.metaPlaylist.filter(function(playlist) {
            return playlist.index === currentSongIndex
        })
        if (!currentObject) return null
        return currentObject
    }

    convertBlobToURL(picture) {
        const { data, type } = picture;
        const byteArray = new Uint8Array(data);
        const blob = new Blob([byteArray], { type });
        const currentObjectURL = URL.createObjectURL(blob);
        return currentObjectURL

    }
}

export default AudioMeta