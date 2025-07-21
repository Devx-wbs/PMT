const TeamMember = require('../models/TeamMember');

exports.checkTaskAccess = async (req, res, next) => {
  const user = req.user;

  if (!user || !user.role) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Allow access to owner and admin for all members
  if (user.role === 'owner' || user.role === 'admin') {
    return next();
  }

  // If team-lead: ensure target teamMemberId belongs to the same team
  const { teamMemberId } = req.params;

  try {
    const targetMember = await TeamMember.findOne({ teamMemberId });

    if (!targetMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    if (user.role === 'team-lead' && targetMember.leadMember !== user._id.toString()) {
      return res.status(403).json({ message: 'Access denied: Not your team member' });
    }

    next();
  } catch (err) {
    console.error('Access check error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};