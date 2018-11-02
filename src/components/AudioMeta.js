import React, { Component } from 'react'
import styles from './styles.scss'

class AudioMeta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            metaPlaylist: props.metaPlaylist,
            currentSongIndex: props.currentSongIndex,
            currentObject: null
        }
        this.getCurrentObject = this.getCurrentObject.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.metaPlaylist !== nextProps.metaPlaylist && nextProps.metaPlaylist.length > 0) {
            this.setState({ metaPlaylist: nextProps.metaPlaylist, currentSongIndex: nextProps.currentSongIndex }, () => this.getCurrentObject())
        } if (this.state.currentSongIndex !== nextProps.currentSongIndex && this.state.metaPlaylist) {
            this.setState({ currentSongIndex: nextProps.currentSongIndex }, () => this.getCurrentObject())
        }
    }

    render() {
        if (this.state.currentObject) {
            return (
                <div className={styles.meta}>
                    <div className={styles.meta__img}>
                        <img src={this.state.currentObject.picture} alt={this.state.metaPlaylist[this.state.currentSongIndex].title} />
                    </div>
                    <div className={styles.meta__tags}>
                        <span className={styles.meta__tags__title}>{this.state.currentObject.title}</span>
                        <span className={styles.meta__tags__artist}>{this.state.currentObject.artist}</span>
                    </div>
                </div>
            )
        } else return <div className={styles.meta}></div>
    }

    getCurrentObject() {
        let currentSongIndex = this.state.currentSongIndex
        let currentObject = this.state.metaPlaylist.filter(function (playlist) {
            return playlist.index === currentSongIndex
        })
        if (currentObject) this.setState({ currentObject: currentObject[0] })
        // return currentObject
    }
}

export default AudioMeta