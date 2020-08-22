const cloudinary = require('../middleware/cloudinary');
const Club = require('../models/clubs');
let image = '';

module.exports.getDashboard = (req, res) => {
    res.render('admin/dashboard')
}

module.exports.uploadimage = async (req, res) => {
    image = await cloudinary.upload(req.files[0].path);
    console.log(image);
    res.send(`it's working`)
}

module.exports.postClub = async (req, res) => {
   
    const newClub = new Club({
        name: req.body.club,
        coutry: req.body.country,
        image: ''
    })

    await newClub.save();
    res.render('admin/dashboard')
}

