const isAdmin = (req, res, next) => {
  // console.log("Checking if user is admin:", req.user);
  if (req.user && req.user.isAdmin) {
    console.log("User is admin");
    return next();
  }
  console.log("User is not admin");
  return res.status(403).json({ success: false, message: "Forbidden" });
};

export default isAdmin;
