var totalList = [];
var watchList = [];

module.exports = {
    create: (req, res) => {
        const {title, review} = req.body;
        totalList.push({title: title, review: review})
        res.status(200).send(totalList)
    },
    read: (req, res) => {
        res.status(200).send(totalList)
    },
    update: (req, res) => {
        let review;
        if(req.query.text){
            review = req.query.text;
        }
        const movieName = req.query.name;
        let index = totalList.findIndex(movie => movie.title == movieName);
        totalList[index] = {
            title: movieName,
            review: review
        }
        res.status(200).send(totalList)
    },
    delete: (req, res) => {
        const movieName = req.query.name;

        let index = watchList.findIndex(movie => movie.title == movieName);

        watchList.splice(index, 1);

        res.status(200).send(watchList)
    },
    addToWatchList: (req, res) => {
            const {title, review} = req.body;
            watchList.push({title: title, review: review})
            res.status(200).send(watchList)
    },
    readFromWatchList: (req, res) => {
        res.status(200).send(watchList)
    }
}