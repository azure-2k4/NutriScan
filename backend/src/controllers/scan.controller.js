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

exports.getScanHistory = async (req, res) => {
  return res.status(200).json({ success: true, message: 'Awaiting Dev 3 ScanHistory model.', data: [] });
};