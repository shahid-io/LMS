'use strict';

const { Role, Permission, RolePermissions } = require('../models'); // Adjust path if needed
// const {PermissionEnum } = require('../types/PermissionEnum'); 
import { RoleEnum, PermissionEnum } from "@types";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed roles
    await Role.bulkCreate([
      { role: RoleEnum.ADMIN, description: "System Administrator" },
      { role: RoleEnum.INSTRUCTOR, description: "Course Instructor" },
      { role: RoleEnum.STUDENT, description: "Student" },
    ]);

    // Seed permissions
    await Permission.bulkCreate(
      Object.values(PermissionEnum).map((name) => ({ name }))
    );

    // Assign permissions to roles (e.g., ADMIN gets all permissions)
    const adminRole = await Role.findOne({ where: { role: RoleEnum.ADMIN } });
    const allPermissions = await Permission.findAll();

    await RolePermissions.bulkCreate(
      allPermissions.map((perm) => ({
        roleId: adminRole.id,
        permissionId: perm.id,
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    // Rollback seed data
    await queryInterface.bulkDelete('RolePermissions', null, {});
    await queryInterface.bulkDelete('Permissions', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
