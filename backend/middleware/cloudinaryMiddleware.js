const multer = require('multer')
const cloudinary = require('cloudinary').v2

const { CloudinaryStorage } = require('multer-storage-cloudinary')

const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'estates',
    format: async () => 'jpg',
    public_id: (req, file) => {
      console.log(
        new Date().toISOString().replace(/:/g, '-') +
          file.originalname
            .toLowerCase()
            .split(' ')
            .join('-')
      )
      return (
        new Date().toISOString().replace(/:/g, '-') +
        file.originalname
          .toLowerCase()
          .split(' ')
          .join('-')
      )
    }
  }
})

const parser = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      console.log('filetype: ' + file.mimetype)
      cb(null, true)
    } else {
      req.fileValidationError = 'Only image file formats are allowed!'
      cb(null, false, req.fileValidationError)
    }
  }
})

module.exports = parser
