// import { NextFunction } from "express";
// import { PermissionEnum } from "../../types/PermissionEnum";
// import RolePermissions from "../../models/RolePermissiomModel";
// import Permission from "../../models/PermissionModel";


// // export class Auth {
// const checkPermission = (requiredPermission: PermissionEnum) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         const user = req.user;
//         const roleId = user?.role;
//         console.log({ user })
//         console.log({ req })

//         const hasPermission = await RolePermissions.findOne({
//             where: {
//                 roleID: roleId,
//                 permissionID: await Permission.findOne({
//                     where: { name: requiredPermission },
//                 }).then((perm) => perm?.id),
//             },
//         });

//         if (!hasPermission) {
//             return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
//         }

//         next();
//     }
// }

// // }