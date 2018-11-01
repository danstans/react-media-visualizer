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
          {/* <span>{props.selectedAlbum.albumArtist}</span> */}
        </div>
        <div className="album-playlist">
          {props.selectedAlbum.songs.map((song, index) => (
            <div key={`songname-${index}`} className="playlist-song" onClick={() => props.updatePlaylist(props.selectedAlbum.songs, index)}>
              {(JSON.stringify(props.playlist) === JSON.stringify(props.selectedAlbum.songs.map(song => song.src)) && props.playlistIsPlaying && props.currentSongIndex === index)
                ? (<i className="fa fa-pause" style={pointerStyles} />)
                : (<i className="fa fa-play" style={{ paddingLeft: '3px', ...pointerStyles }} />)}
              <span style={pointerStyles}>{song.name}</span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default ShowPlaylists