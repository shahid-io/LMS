
# PostgreSQL Commands Guide

This markdown file contains a guide to basic PostgreSQL commands for managing databases, tables, and users.

## List All Databases

```sql
\l
```

## Connect to a Specific Database

```sql
\c database_name
```

## List All Tables in the Current Database

```sql
\dt
```

## List All Users and Their Privileges

```sql
\du
```

## Display Table Definition Including Foreign Keys

```sql
\d+ table_name
```

---

### Commands to Check if a Specific Database Exists

- You can use the following SQL query to check if a specific database, such as 'lms', exists:

```sql
SELECT datname FROM pg_database WHERE datname='lms';
```

This query returns the name of the database if it exists.

---

### Commands to List Tables in a Specific Database

- To list all tables in the 'lms' database, first connect to the database:

```sql
\c lms
```

Then list the tables:

```sql
\dt
```

INSERT INTO "Roles" ("role", "description", "createdAt", "updatedAt")
VALUES ('admin', 'Admin User', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
