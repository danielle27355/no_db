var totalList = [];
var watchList = [];

module.exports = {
    create: (req, res) => {
        const {title, review} = req.body;
        watchList.push({title: title, review: review})
        res.status(200).send(watchList)
    },
    read: (req, res) => {
        res.status(200).send(watchList)
    },
    update: (req, res) => {
        let review;
        if(req.query.text){
            review = req.query.text;
        }
        const movieName = req.query.name;
        let index = watchList.findIndex(movie => movie.title == movieName);
        watchList[index] = {
            title: movieName,
            review: review
        }
        res.status(200).send(watchList)
    },
    delete: (req, res) => {
        const movieName = req.query.name;

        let index = watchList.findIndex(movie => movie.title == movieName);

        watchList.splice(index, 1);

        res.status(200).send(watchList)
    }
}