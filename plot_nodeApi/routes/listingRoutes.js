const { createListing, getListing, deleteListing, searchNow , updateListing, giveReview, getListingByid, createEnquiry, getAllEnquires } = require('../controller/listingController');
const {protected, webProtected} = require('../middleware/checkAuth');
const {upload} = require('../middleware/uploadFile');
const router = require('express').Router();

router.route('/createListing').post(protected ,upload.any(),createListing)
router.route('/getListing').get(webProtected,getListing);
router.route('/deleteListing/:id').put(protected,deleteListing);
router.route('/updateListing/:id').put(protected,upload.any(),updateListing);
router.route('/searchNow').get(webProtected,searchNow);
router.route('/giveReview/:listingid').put(protected,giveReview);
router.route('/getListingByid/:id').get(webProtected,getListingByid);
router.route('/enquiry/:listingid').post(protected,createEnquiry);
router.route('/getenquiry').get(protected,getAllEnquires);

module.exports = router