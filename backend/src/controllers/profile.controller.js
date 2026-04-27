const Profile = require('../models/Profile');

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private
exports.upsertProfile = async (req, res, next) => {
  try {
    const profileFields = {
      userId: req.user.id,
      ...req.body
    };

    let profile = await Profile.findOne({ userId: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { userId: req.user.id },
        { $set: profileFields },
        { new: true, runValidators: true }
      );
      return res.status(200).json({ success: true, data: profile });
    }

    // Create
    profile = await Profile.create(profileFields);
    res.status(201).json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'There is no profile for this user' });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};
