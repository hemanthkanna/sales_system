exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  res.status(200).json({
    message: "Access Forbidden only Admin can access this Resources",
  });
};
