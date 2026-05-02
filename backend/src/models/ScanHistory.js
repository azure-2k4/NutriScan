const mongoose = require('mongoose');

const ScanHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  barcode: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  brand: String,
  imageUrl: String,
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  colorFlag: {
    type: String,
    enum: ['green', 'yellow', 'red']
  },
  explanation: String,
  alternatives: [{
    name: String,
    reason: String
  }],
  nutrition: {
    calories: Number,
    protein: Number,
    sugar: Number,
    fat: Number,
    fibre: Number,
    carbs: Number,
    sodium: Number
  }
}, {
  timestamps: true
});

// Index for faster history retrieval
ScanHistorySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('ScanHistory', ScanHistorySchema);
