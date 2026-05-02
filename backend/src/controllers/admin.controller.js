const ScanHistory = require('../models/ScanHistory');
const User = require('../models/User');

exports.exportScans = async (req, res, next) => {
  try {
    const scans = await ScanHistory.find().populate('userId', 'name email');
    
    // Build CSV manually
    let csv = 'Scan ID,Date,User Name,User Email,Barcode,Product,Brand,Score,Flag\n';
    
    scans.forEach(scan => {
      csv += `"${scan._id}","${scan.createdAt.toISOString()}","${scan.userId?.name || 'Unknown'}","${scan.userId?.email || 'N/A'}","${scan.barcode}","${scan.productName}","${scan.brand || ''}","${scan.score}","${scan.colorFlag}"\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('nutriscan_export.csv');
    return res.status(200).send(csv);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const scanCount = await ScanHistory.countDocuments();
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers: userCount,
        totalScans: scanCount,
        activeToday: 5, // Mocked for now
        flaggedItems: 2 // Mocked for now
      }
    });
  } catch (err) {
    next(err);
  }
};
