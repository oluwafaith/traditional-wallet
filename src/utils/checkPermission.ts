import CustomError from "../errors/index";

const checkPermissions = (requestUser: any, resourceUserId: any) => {
 
  
  if (requestUser.role === "admin") return;
 
  
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route"
  );
};

export default checkPermissions;
