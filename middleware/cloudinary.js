const cloudinary = require('cloudinary');
// const config = require('config');

cloudinary.config({
    cloud_name: "cloud_account",
    api_key: "cloud_api_key",
    api_secret:"cloud_api_secrets",
})

exports.upload = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({ url: result.url, id: result.public_id })
        }, { resource_type: "auto" })
    })
}