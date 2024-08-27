# LMS Database Design

### Core Entities and Relationships

#### 1. **Users**

- **Attributes**: ID, Username, Email, Password, RoleID
- **Description**: Stores user details. Users can be students, instructors, or administrators.

#### 2. **Roles**

- **Attributes**: ID, Name (Admin, Instructor, Student)
- **Description**: Defines roles within the LMS to control access based on responsibilities.

#### 3. **Courses**

- **Attributes**: CourseID, Title, Description, InstructorID, StartDate, EndDate
- **Description**: Represents courses offered, each possibly taught by different instructors.

#### 4. **Modules**

- **Attributes**: ModuleID, CourseID, Title, Description, Order
- **Description**: Breaks down courses into smaller units or modules for easier management.

#### 5. **Enrollments**

- **Attributes**: EnrollmentID, CourseID, UserID, EnrollmentDate, Progress, Status
- **Description**: Tracks which users are enrolled in which courses and their progress.

#### 6. **Permissions**

- **Attributes**: PermissionID, Name (e.g., EditCourse, ViewGrades)
- **Description**: Specific actions that roles are allowed to perform within the LMS.

#### 7. **Role_Permissions**

- **Attributes**: RoleID, PermissionID
- **Description**: Many-to-many linkage between roles and permissions, determining what each role can do.

#### 8. **Assessments**

- **Attributes**: AssessmentID, ModuleID, Title, Type (Quiz, Assignment, Exam), MaxScore
- **Description**: Evaluative components within modules, like quizzes or assignments.

#### 9. **Questions**

- **Attributes**: QuestionID, AssessmentID, Text, QuestionType (MCQ, True/False), Points
- **Description**: Stores questions for assessments.

#### 10. **Answers**

- **Attributes**: AnswerID, QuestionID, UserID, SubmissionText, Score
- **Description**: Records users' answers to assessment questions and the scores awarded.

#### 11. **Course Materials**

- **Attributes**: MaterialID, ModuleID, Title, FileType (PDF, Video), URL
- **Description**: Learning materials associated with each module.

#### 12. **Discussions**

- **Attributes**: DiscussionID, CourseID, UserID, Message, PostedAt
- **Description**: Forum for students and instructors to discuss course content.

#### 13. **Logs**

- **Attributes**: LogID, UserID, ActionType, Details, Timestamp
- **Description**: Tracks user actions for security and auditing purposes.

### Example SQL Schema

```sql
CREATE TABLE Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Roles(ID)
);

CREATE TABLE Roles (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    InstructorID INT,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (InstructorID) REFERENCES Users(ID)
);

CREATE TABLE Modules (
    ModuleID INT PRIMARY KEY AUTO_INCREMENT,
    CourseID INT,
    Title VARCHAR(255),
    Description TEXT,
    Order INT,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY AUTO_INCREMENT,
    CourseID INT,
    UserID INT,
    EnrollmentDate DATE,
    Progress INT,
    Status VARCHAR(50),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

CREATE TABLE Permissions (
    PermissionID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Role_Permissions (
    RoleID INT,
    PermissionID INT,
    PRIMARY KEY (RoleID, PermissionID),
    FOREIGN KEY (RoleID) REFERENCES Roles(ID),
    FOREIGN KEY (PermissionID) REFERENCES Permissions(PermissionID)
);

-- Additional tables for Assessments, Questions, Answers, Course Materials, Discussions, Logs can be created similarly.
