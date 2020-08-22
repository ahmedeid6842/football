module.exports.getNews = (req, res) => {
    res.render('news/footballnews', {
        title: 'Footballkik - Latest News',
        user: req.user
    })
}