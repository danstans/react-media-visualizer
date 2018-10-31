import React from 'react'

const ShowPlaylists = (props) => {
  const pointerStyles = { cursor: 'pointer' }

  return (
    <React.Fragment>
      <div className="album">
        <span style={pointerStyles} onClick={props.clearSelectedAlbum}>‹ Back to Soundtracks</span>
        <div className="album-meta">
          <img src={props.selectedAlbum.albumArtwork} alt={props.selectedAlbum.albumName} />
          <span>{props.selectedAlbum.albumName}</span>
        </div>
        <div className="album-playlist">
          {props.selectedAlbum.songNames.map((songName, index) => (
            <div key={`songname-${index}`} className="playlist-song" onClick={() => props.updatePlaylist(props.selectedAlbum.songs, index)}>
              {(props.playlist === props.selectedAlbum.songs && props.playlistIsPlaying && props.currentSongIndex === index)
                ? (<i className="fa fa-pause" style={pointerStyles} />)
                : (<i className="fa fa-play" style={{ paddingLeft: '3px', ...pointerStyles }} />)}
              <span style={pointerStyles}>{songName}</span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default ShowPlaylists