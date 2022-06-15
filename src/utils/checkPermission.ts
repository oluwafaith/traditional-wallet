import CustomError from "../errors/index";

const checkPermissions = (requestUser: any, resourceUserId: any) => {
  console.log("kiuytgh ");
  
  if (requestUser.role === "admin") return;
  console.log(requestUser, "kil");
  
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route"
  );
};

export default checkPermissions;
