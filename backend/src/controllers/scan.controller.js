const scanService  = require('../services/scan.service');
const cacheService = require('../services/productCache.service');

exports.scanByBarcode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const userId   = req.user ? req.user._id : '000000000000000000000000';
    const result   = await scanService.runScan(code, userId);
    if (!result.success) {
      return res.status(result.statusCode || 500).json({ success: false, message: result.error });
    }
    return res.status(200).json({ success: true, message: 'Scan complete.', data: result });
  } catch (err) { next(err); }
};

exports.scanBySearch = async (req, res, next) => {
  try {
    const { q } = req.body;
    const searchResult = await cacheService.searchProducts(q, 1, 5);
    if (!searchResult.success) {
      return res.status(searchResult.statusCode || 500).json({ success: false, message: searchResult.error });
    }
    if (!searchResult.data || searchResult.data.length === 0) {
      return res.status(404).json({ success: false, message: `No products found for "${q}".` });
    }
    return res.status(200).json({
      success: true,
      message: `Found ${searchResult.data.length} result(s) for "${q}".`,
      data: { results: searchResult.data, total: searchResult.total, query: q },
    });
  } catch (err) { next(err); }
};

exports.scanManual = async (req, res, next) => {
  try {
    const userId  = req.user ? req.user._id : '000000000000000000000000';
    const barcode = req.body.barcode || `MANUAL-${Date.now()}`;
    const saveResult = await cacheService.saveManualEntry(barcode, req.body);
    if (!saveResult.success) {
      return res.status(saveResult.statusCode || 500).json({ success: false, message: saveResult.error });
    }
    const result = await scanService.runScan(barcode, userId);
    if (!result.success) {
      return res.status(result.statusCode || 500).json({ success: false, message: result.error });
    }
    return res.status(200).json({ success: true, message: 'Manual product scanned.', data: result });
  } catch (err) { next(err); }
};

const ScanHistory = require('../models/ScanHistory');

exports.getScanHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const history = await ScanHistory.find({ userId }).sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
};

exports.getScanHistoryItem = async (req, res, next) => {
  try {
    const item = await ScanHistory.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Scan not found' });
    
    // Check ownership
    if (item.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Map history item back to product format for UI consistency
    const result = {
      product: {
        name: item.productName,
        brand: item.brand,
        barcode: item.barcode,
        imageUrl: item.imageUrl,
        nutrition: item.nutrition
      },
      score: item.score,
      colorFlag: item.colorFlag,
      explanation: item.explanation,
      alternatives: item.alternatives,
      allergenAlerts: [] 
    };

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};