import React, { Component } from 'react'
import axios from 'axios';
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import Moment from "react-moment";
class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }
  componentDidMount() {
    let path = `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`;
    axios.get(path)
      .then(res => {
        // console.log(res.data);
        this.setState({ lyrics: res.data.message.body.lyrics });

        let pathTrack = `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`;
        return axios.get(pathTrack);
      })
      .then(res => {
        //console.log(res.data);
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { track, lyrics } = this.state;
    if (track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0) {
      return <Spinner />;
    }
    else {
      let genre = '';
      console.log(track);
      if (track.primary_genres.music_genre_list === undefined || track.primary_genres.music_genre_list.length === 0) {
        genre = 'Brak'
      }
      else {
        genre = track.primary_genres.music_genre_list[0].music_genre.music_genre_name;
      }
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">Powrót</Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} autor <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">
                {lyrics.lyrics_body}
              </p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Id Albumu</strong>: {track.album_id}
            </li>
            <li className="list-group-item">

              <strong>Gatunek</strong>: {genre}
            </li>
            <li className="list-group-item">
              <strong>Wyraźne słowa</strong>: {track.explicit === 0 ? 'Tak' : 'Nie'}
            </li>
            <li className="list-group-item">
              <strong>Data wydania</strong>: <Moment format="YYYY-MM-DD">{track.first_release_date}</Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }

  }
}

export default Lyrics;