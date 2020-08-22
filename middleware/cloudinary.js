const cloudinary = require('cloudinary');
// const config = require('config');

cloudinary.config({
    cloud_name: "dj2yju5sd",
    api_key: "118986315778499",
    api_secret:"2BBVdNTae_5jcYqog3mqZTE4MZ4",
})

exports.upload = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({ url: result.url, id: result.public_id })
        }, { resource_type: "auto" })
    })
}