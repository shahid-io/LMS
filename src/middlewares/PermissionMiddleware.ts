import { Request, Response, NextFunction } from 'express';
import Permission from '../models/PermissionModel';
import RolePermissions from '../models/RolePermissiomModel';
import { PermissionEnum } from '../types';

class PermissionChecker {
    public checkPermission = (requiredPermission: PermissionEnum) => {
        console.log({ requiredPermission })
        return async (req: Request, res: Response, next: NextFunction) => {
            const user = req.user;
            const roleId = user?.roleId;

            if (!roleId) {
                return res.status(403).json({ error: 'Forbidden: Role not found' });
            }

            try {
                const permission = await Permission.findOne({
                    where: { name: requiredPermission },
                    // logging: console.log
                });
                if (!permission) {
                    return res.status(403).json({ error: 'Forbidden: Permission not found' });
                }

                const hasPermission = await RolePermissions.findOne({
                    where: {
                        roleId: roleId,
                        permissionId: permission.id,
                    },
                    // logging: console.log
                });
                if (!hasPermission) {
                    return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
                }

                next();
            } catch (error) {
                console.error('Permission check failed:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        };
    };
}

export default PermissionChecker;