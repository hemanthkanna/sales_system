exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  if(!req.user) {
    return res.status(404).json({ message: 'Login first to access this resources' });
  }

  res.status(200).json({
    message: "Access Forbidden only Admin can access this Resources",
  });
};
