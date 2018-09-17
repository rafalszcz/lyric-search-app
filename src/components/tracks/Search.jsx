import React, { Component } from 'react'
import axios from 'axios';
import { Consumer } from '../../context';
class Search extends Component {
    state = {
        trackTitle: ''
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    findTrack = (dispatch, e) => {
        e.preventDefault();
        // console.log(process.env.REACT_APP_MM_KEY);
        let path = `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`;
        // console.log(path);
        axios.get(path)
            .then(res => {

                console.log(res.data);
                dispatch({
                    type: 'SEARCH_TRACKS',
                    paylaod: res.data.message.body.track_list
                });
                this.setState({trackTitle:''});
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    //console.log(value);
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i>Szukaj piosenki
                            </h1>
                            <p className="lead text-center">Pobierz tekst dla dowolnej piosenki
                            </p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Tytuł piosenki..." name="trackTitle"
                                        value={this.state.trackTitle} onChange={this.onChange} />
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Pobierz Tekst Piosenki</button>
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}
export default Search;
