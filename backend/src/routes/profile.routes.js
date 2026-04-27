const express = require('express');
const { getProfile, upsertProfile } = require('../controllers/profile.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
  .get(protect, getProfile)
  .post(protect, upsertProfile)
  .put(protect, upsertProfile); // Alias for update

module.exports = router;
