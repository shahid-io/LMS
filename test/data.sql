INSERT INTO "Roles" (role, description, "createdAt", "updatedAt") VALUES
('admin', 'System Administrator', NOW(), NOW()),
('instructor', 'Course Instructor', NOW(), NOW()),
('student', 'Student', NOW(), NOW());


INSERT INTO "Permissions" (name, "createdAt", "updatedAt") VALUES
('CREATE_COURSE', now(), now()),
('EDIT_COURSE', now(), now()),
('DELETE_COURSE', now(), now()),
('VIEW_GRADES', now(), now()),
('SUBMIT_ASSIGNMENT', now(), now()),
('MANAGE_USERS', now(), now());


SELECT id, "createdAt", "updatedAt", "deletedAt", "roleId", "permissionId"
	FROM public."RolePermissions";
	
SELECT id, "createdAt", "updatedAt", "deletedAt", "roleId", "permissionId"
	FROM public."RolePermissions";
	
INSERT INTO "RolePermissions" ("roleId", "permissionId", "createdAt", "updatedAt") VALUES
(1, 1, now(), now()), -- ADMIN can CREATE_COURSE
(1, 2, now(), now()), -- ADMIN can EDIT_COURSE
(1, 3, now(), now()), -- ADMIN can DELETE_COURSE
(1, 4, now(), now()), -- ADMIN can VIEW_GRADES
(1, 5, now(), now()), -- ADMIN can SUBMIT_ASSIGNMENT
(1, 6, now(), now()); -- ADMIN can MANAGE_USERS


INSERT INTO "RolePermissions" ("roleId", "permissionId", "createdAt", "updatedAt") VALUES
(2, 1, now(), now()), -- INSTRUCTOR can CREATE_COURSE
(2, 2, now(), now()), -- INSTRUCTOR can EDIT_COURSE
(2, 4, now(), now()); -- INSTRUCTOR can VIEW_GRADES


-- Assign specific permissions to STUDENT (roleId = 3)
INSERT INTO "RolePermissions" ("roleId", "permissionId", "createdAt", "updatedAt") VALUES
(3, 5, now(), now()); -- STUDENT can SUBMIT_ASSIGNMENT