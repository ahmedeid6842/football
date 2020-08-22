module.exports.getlogOut = async (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect('/');
    })
}