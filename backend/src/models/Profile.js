const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: 1,
    max: 120
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  height: {
    type: Number, // in cm
    min: 50,
    max: 300
  },
  weight: {
    type: Number, // in kg
    min: 20,
    max: 500
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active']
  },
  healthGoals: [{
    type: String,
    enum: ['weight_loss', 'muscle_gain', 'maintenance', 'eat_healthier', 'manage_condition']
  }],
  conditions: [{
    type: String,
    enum: ['diabetes', 'hypertension', 'celiac', 'heart_disease', 'none']
  }],
  allergies: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);
