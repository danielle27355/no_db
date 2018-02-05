const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const cp = require('./controller/controller-profile')
const wl = require('./controller/controller-watchList')

const app = express();

app.use(bodyParser.json());
app.use(cors());

const baseURLforGenre = '/api/moviesGenre/'
// const baseURLforReviews ='/api/moviesReview'
const watchListUrl = '/api/watchList'
const reviewedUrl = '/api/reviewed'

var genre = [];

axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US').then(response => {
        genre = [...response.data.genres]
    })
app.get(baseURLforGenre, (req, res) => { 
    res.send(genre)
})


app.post(reviewedUrl, wl.create);
app.get(reviewedUrl, wl.read);
app.delete(reviewedUrl, wl.delete);
app.put(reviewedUrl, wl.update);

app.post(watchListUrl, wl.addToWatchList);
app.get(watchListUrl, wl.readFromWatchList);
app.delete(watchListUrl, wl.delete);



// app.get(baseURL, (req, res) => {
//     req.pipe(request('https://api.themoviedb.org/3/genre/movie/list?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US')).pipe(res)
// })

const port = 4000;

app.listen(port, () => console.log(`this port is running on port ${4000}`))