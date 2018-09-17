import React, { Component } from 'react'
import axios from 'axios'
const Context = React.createContext();

const reducer = (state, action) => {
    console.log('reducer');
    console.log(action.paylaod);
    switch (action.type) {
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list: action.paylaod,
                heading: 'Wyniki wyszukiwania'
            };
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        track_list: [],
        heading: 'Top 10 tracks',
        dispatch: action => this.setState(state => reducer(state, action))
    }
    componentDidMount() {
        // console.log(process.env.REACT_APP_MM_KEY);
        let path = `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=pl&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`;
        // console.log(path);
        axios.get(path)
            .then(res => {

                // console.log(res.data);
                this.setState({ track_list: res.data.message.body.track_list });
            })
            .catch(err => console.log(err));
    }
    render() {

        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;