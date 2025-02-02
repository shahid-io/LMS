import { Request, Response, NextFunction } from 'express';
import Permission from '../models/PermissionModel';
import RolePermissions from '../models/RolePermissiomModel';
import { PermissionEnum } from '../types';

class PermissionChecker {
    private requiredPermission: PermissionEnum;

    constructor(requiredPermission: PermissionEnum) {
        this.requiredPermission = requiredPermission;
    }

    public checkPermission = () => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const user = req.user;
            const roleId = user?.roleId;

            const hasPermission = await RolePermissions.findOne({
                where: {
                    roleId: roleId,
                    permissionId: await Permission.findOne({
                        where: { name: this.requiredPermission },
                    }).then((perm) => perm?.id),
                },
            });

            if (!hasPermission) {
                return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
            }

            next();
        };
    };
}

export default PermissionChecker;
