const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  let authHeader = req.header("authorization");
  if (authHeader) {
    authHeader = authHeader.split(" ");
    const token = authHeader[1];
    if (!token) {
      return res.status(403).send({ message: "A token is required" });
    }
    try {
      const getuser = jwt.verify(token);
      req.user = getuser;
      next();
    } catch (err) {
      return res.status(401).send({ message: "token is not valid" });
    }
  } else {
    return res
      .status(403)
      .send({ message: "A token is required for Authentication" });
  }
};

const varifyTokenAndUser = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.id){
            next();
        }else{
            return next(CustomErrorHandler.unAthorized("You are not user"))
        }
    })

}

module.exports = {
    varifyTokenAndUser,
    verifyToken
}
