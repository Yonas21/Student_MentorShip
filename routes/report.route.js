const express = require('express');
const multer = require('multer');

const router = express.Router();
const reportController  = require('../controllers/report');

//filter the kinds of images to be stored.
const imageFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 20,
    fileFilter: imageFilter
});
//find out all students registered
router.get('/', reportController.get_all_reports);

//find individual students
router.get('/:reportId', reportController.get_a_report);

//register a student
router.post('/',
    upload.fields([
        {name: 'image', maxCount: 4},
        {name: 'video', maxCount: 1}
        ])
    ,reportController.create_a_report);

router.delete('/:reportId', reportController.delete_a_report);

module.exports = router;
