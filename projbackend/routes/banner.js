const express = require("express");
const router = express.Router();

const {
    getBannerById,
    createBanner,
    getBanner,
    photo,
    updateBanner,
    getAllBanner,
  } = require("../controllers/banner");
  const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
  const { getUserById } = require("../controllers/user");
  
  router.param("userId", getUserById);
router.param("BannerId", getBannerById);


router.post(
    "/banner/create",
    createBanner
  );
  
  // read routes
  router.get("/banner/:BannerId", getBanner);
  router.get("/banner/photo/:BannerId", photo);
  

  
  //update route
  router.put(
    "/banner/update/:BannerId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateBanner
  );
  
  //listing route
  router.get("/banners", getAllBanner);

  module.exports = router;
  