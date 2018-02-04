var watchList = [
    {title: 'Jumanji', review:'This movie was Great!'},
    {title: 'John Wick', review:'This movie was just ok!'},
    {title: 'Blade Runner 2049', review: 'This movie was incredible'}
];

module.exports = {
    create: (req, res) => {
        const {title} = req.body;

        watchList.push({title: title})

        res.status(200).send(watchList)
    },
    read: (req, res) => {
        res.status(200).send(watchList)
    },
    update: (req, res) => {
        const movieName = req.query.name;
        let index = watchList.findIndex(movie => movie.title == movieName);

        watchList[index] = {
            title: watchList[index].name,
            review: req.body.review || req[index].review
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