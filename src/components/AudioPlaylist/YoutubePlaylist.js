import React from 'react'
import PropTypes from 'prop-types'

const YoutubePlaylist = (props) => {
  return (
    (props.metaPlaylist && props.metaPlaylist[0])
      ? (<div className={props.styles.audio__playlist}>
        <div className={props.styles.padded__container}>
          <div className={props.styles.image__container}>
            <div className={props.styles.square__container}>
              <img src={props.metaPlaylist[props.currentSongIndex].picture} />
            </div>
          </div>
          <div className={props.styles.playlist__container}>
            <div className={props.styles.playlist__header}>
              <span className={props.styles.songName}><b> Album - {props.metaPlaylist[0].album}</b></span>
            </div>
            <div className={props.styles.playlist__content}>
              {props.metaPlaylist.map((song, index) => (
                <span key={`playlist-item-${index}`}>
                  <span className={props.styles.songNum}>
                    {props.currentSongIndex === index
                      ? (props.playlistIsPlaying
                        ? <span onClick={() => props.updateIsPlaying()}><i className='fa fa-pause fa-xs' /></span>
                        : <span onClick={() => props.updateIsPlaying()}><i className='fa fa-play fa-xs' /></span>
                      ) : (<span onClick={() => props.selectSongFromPlaylist(index)}>{index + 1}</span>)}
                  </span>
                  {props.currentSongIndex === index
                    ? <div onClick={() => props.updateIsPlaying()} className={props.styles.songName}>
                      <span>{song.title}</span>
                      <span>{song.album}</span>
                    </div>
                    : <div onClick={() => props.selectSongFromPlaylist(index)} className={props.styles.songName}>
                      <span>{song.title}</span>
                      <span>{song.album}</span>
                    </div>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>)
      : <div className={props.styles.audio__playlist}>Nothing to render</div>
  )
}

YoutubePlaylist.propTypes = {
  metaPlaylist: PropTypes.array,
  styles: PropTypes.object,
  currentSongIndex: PropTypes.number,
  playlistIsPlaying: PropTypes.bool,
  updateIsPlaying: PropTypes.func,
  selectSongFromPlaylist: PropTypes.func
}

export default YoutubePlaylist
