const express = require('express');
const { exportScans, getStats } = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Admin routes (protected and restricted to admin)
router.use(protect);
router.use(authorize('admin'));

router.get('/export-scans', exportScans);
router.get('/stats', getStats);

module.exports = router;
