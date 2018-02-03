var moviesWithReviews = [{
    title: 'Jumanji',
    review: 'This movie was Great!'
}];

module.exports = {
    create: (req, res) => {
        const {title, img_url, review} = req.body;

        moviesWithReviews.push({title: title, review})

        const movieName = req.query.name;
        let index = moviesWithReviews.findIndex(movie => movie.title == movieName);

        res.status(200).send(moviesWithReviews[index])
    },
    read: (req, res) => {
        console.log(req.query.name)
        var movieName = req.query.name;

        let index = moviesWithReviews.findIndex(movie => movie.title == movieName);

        res.status(200).send(moviesWithReviews[index])
    },
    update: (req, res) => {
        const movieName = req.query.name;
        let index = moviesWithReviews.findIndex(movie => movie.title == movieName);

        moviesWithReviews[index] = {
            title: moviesWithReviews[index].name,
            review: req.body.review || req[index].review
        }
        res.status(200).send(moviesWithReviews[index])
    },
    delete: (req, res) => {
        const movieName = req.query.name;

        let index = moviesWithReviews.findIndex(movie => movie.title == movieName);

        moviesWithReviews.splice(index, 1);

        res.status(200)
    }
}