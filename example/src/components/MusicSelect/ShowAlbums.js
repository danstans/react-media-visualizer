import React from 'react'

const ShowAlbums = (props) => {
  const pointerStyles = { cursor: 'pointer' }

  return (
    <React.Fragment>
      <h2>Albums</h2>
      <div className="grid">{props.media.map((playlist, index) => (
        <div className="playlist-square" style={pointerStyles} onClick={() => props.selectAlbum(playlist)} key={`playlist-${index}`}>
          <img src={playlist.albumArtwork} alt={playlist.albumName} />
          <div className="play-button" onClick={(e) => { e.stopPropagation(); props.updatePlaylist(playlist.songs) }}>
            {(JSON.stringify(props.playlist) === JSON.stringify(playlist.songs.map(song => song.src)) && props.playlistIsPlaying)
              ? (<i className="fa fa-pause" />)
              : (<i className="fa fa-play" style={{ paddingLeft: '3px' }} />)}
          </div>
        </div>))}
      </div>
    </React.Fragment>
  )
}

export default ShowAlbums