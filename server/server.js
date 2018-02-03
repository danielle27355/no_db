const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const cp = require('./controller/controller-profile')

const app = express();

app.use(bodyParser.json());
app.use(cors());

const baseURLforGenre = '/api/moviesGenre/'
const baseURLforReviews ='/api/moviesReview'

var genre = [];

axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US').then(response => {
        genre = [...response.data.genres]
    })
app.get(baseURLforGenre, (req, res) => { 
    res.send(genre)
})


app.post(baseURLforReviews, cp.create);
app.get(baseURLforReviews, cp.read);
app.put(baseURLforReviews, cp.update);
app.delete(baseURLforReviews, cp.delete);


// app.get(baseURL, (req, res) => {
//     req.pipe(request('https://api.themoviedb.org/3/genre/movie/list?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US')).pipe(res)
// })

const port = 4000;

app.listen(port, () => console.log(`this port is running on port ${4000}`))