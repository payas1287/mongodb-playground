"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("Nopermission: You must Login.");
    }
  },
  isAdmim: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("Nopermission : You must Login and to be Admin");
    }
  },
  isAdminOrLead : (req,res, next) => {
    if(
        requser && req.user.isActive && (req.user.isAdmim || (req.user.isLead && req.user.departmentId === departmentId))
    ){
        next()
    }else{
        res.errorStatusCode = 403;
        throw new Error("NoPermission: You must Login to be Admin or DepartmentLead")
    }
  }
};
