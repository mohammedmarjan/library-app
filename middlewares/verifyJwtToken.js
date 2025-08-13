const jwt = require('jsonwebtoken');

function verifyJwtToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

module.exports = verifyJwtToken;
