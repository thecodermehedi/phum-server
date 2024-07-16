# phuniapi

```md
📦phuniapi
 ┣ 📂src
 ┃ ┣ 📂builder
 ┃ ┃ ┗ 📜QueryBuilder.ts
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜config.types.ts
 ┃ ┃ ┣ 📜config.validator.ts
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂errors
 ┃ ┃ ┣ 📜AppError.ts
 ┃ ┃ ┣ 📜handleCastError.ts
 ┃ ┃ ┣ 📜handleDuplicateError.ts
 ┃ ┃ ┣ 📜handleValidationError.ts
 ┃ ┃ ┗ 📜handleZodError.ts
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜globalErrorHandler.ts
 ┃ ┃ ┣ 📜notFound.ts
 ┃ ┃ ┗ 📜validateRequest.ts
 ┃ ┣ 📂modules
 ┃ ┃ ┣ 📂AcademicDepartment
 ┃ ┃ ┃ ┣ 📜academicDepartment.controller.ts
 ┃ ┃ ┃ ┣ 📜academicDepartment.model.ts
 ┃ ┃ ┃ ┣ 📜academicDepartment.routes.ts
 ┃ ┃ ┃ ┣ 📜academicDepartment.service.ts
 ┃ ┃ ┃ ┣ 📜academicDepartment.types.ts
 ┃ ┃ ┃ ┗ 📜academicDepartment.validator.ts
 ┃ ┃ ┣ 📂AcademicFaculty
 ┃ ┃ ┃ ┣ 📜academicFaculty.controller.ts
 ┃ ┃ ┃ ┣ 📜academicFaculty.model.ts
 ┃ ┃ ┃ ┣ 📜academicFaculty.routes.ts
 ┃ ┃ ┃ ┣ 📜academicFaculty.service.ts
 ┃ ┃ ┃ ┣ 📜academicFaculty.types.ts
 ┃ ┃ ┃ ┗ 📜academicFaculty.validator.ts
 ┃ ┃ ┣ 📂AcademicSemester
 ┃ ┃ ┃ ┣ 📜academicSemester.constant.ts
 ┃ ┃ ┃ ┣ 📜academicSemester.controller.ts
 ┃ ┃ ┃ ┣ 📜academicSemester.model.ts
 ┃ ┃ ┃ ┣ 📜academicSemester.routes.ts
 ┃ ┃ ┃ ┣ 📜academicSemester.service.ts
 ┃ ┃ ┃ ┣ 📜academicSemester.types.ts
 ┃ ┃ ┃ ┗ 📜academicSemester.validator.ts
 ┃ ┃ ┣ 📂Admin
 ┃ ┃ ┃ ┣ 📜admin.constant.ts
 ┃ ┃ ┃ ┣ 📜admin.controller.ts
 ┃ ┃ ┃ ┣ 📜admin.model.ts
 ┃ ┃ ┃ ┣ 📜admin.routes.ts
 ┃ ┃ ┃ ┣ 📜admin.service.ts
 ┃ ┃ ┃ ┣ 📜admin.types.ts
 ┃ ┃ ┃ ┗ 📜admin.validator.ts
 ┃ ┃ ┣ 📂Auth
 ┃ ┃ ┃ ┣ 📜auth.controller.ts
 ┃ ┃ ┃ ┣ 📜auth.routes.ts
 ┃ ┃ ┃ ┣ 📜auth.service.ts
 ┃ ┃ ┃ ┣ 📜auth.types.ts
 ┃ ┃ ┃ ┗ 📜auth.validator.ts
 ┃ ┃ ┣ 📂Course
 ┃ ┃ ┃ ┣ 📜course.constant.ts
 ┃ ┃ ┃ ┣ 📜course.controller.ts
 ┃ ┃ ┃ ┣ 📜course.model.ts
 ┃ ┃ ┃ ┣ 📜course.routes.ts
 ┃ ┃ ┃ ┣ 📜course.service.ts
 ┃ ┃ ┃ ┣ 📜course.types.ts
 ┃ ┃ ┃ ┗ 📜course.validator.ts
 ┃ ┃ ┣ 📂Faculty
 ┃ ┃ ┃ ┣ 📜faculty.constant.ts
 ┃ ┃ ┃ ┣ 📜faculty.controller.ts
 ┃ ┃ ┃ ┣ 📜faculty.model.ts
 ┃ ┃ ┃ ┣ 📜faculty.routes.ts
 ┃ ┃ ┃ ┣ 📜faculty.service.ts
 ┃ ┃ ┃ ┣ 📜faculty.types.ts
 ┃ ┃ ┃ ┗ 📜faculty.validator.ts
 ┃ ┃ ┣ 📂OfferedCourse
 ┃ ┃ ┃ ┣ 📜offeredCourse.constant.ts
 ┃ ┃ ┃ ┣ 📜offeredCourse.controller.ts
 ┃ ┃ ┃ ┣ 📜offeredCourse.model.ts
 ┃ ┃ ┃ ┣ 📜offeredCourse.routes.ts
 ┃ ┃ ┃ ┣ 📜offeredCourse.service.ts
 ┃ ┃ ┃ ┣ 📜offeredCourse.types.ts
 ┃ ┃ ┃ ┣ 📜offeredCourse.utils.ts
 ┃ ┃ ┃ ┗ 📜offeredCourse.validator.ts
 ┃ ┃ ┣ 📂SemesterRegistration
 ┃ ┃ ┃ ┣ 📜semesterRegistration.constant.ts
 ┃ ┃ ┃ ┣ 📜semesterRegistration.controller.ts
 ┃ ┃ ┃ ┣ 📜semesterRegistration.model.ts
 ┃ ┃ ┃ ┣ 📜semesterRegistration.routes.ts
 ┃ ┃ ┃ ┣ 📜semesterRegistration.service.ts
 ┃ ┃ ┃ ┣ 📜semesterRegistration.types.ts
 ┃ ┃ ┃ ┗ 📜semesterRegistration.validator.ts
 ┃ ┃ ┣ 📂Student
 ┃ ┃ ┃ ┣ 📜student.constant.ts
 ┃ ┃ ┃ ┣ 📜student.controller.ts
 ┃ ┃ ┃ ┣ 📜student.interface.ts
 ┃ ┃ ┃ ┣ 📜student.model.ts
 ┃ ┃ ┃ ┣ 📜student.routes.ts
 ┃ ┃ ┃ ┣ 📜student.service.ts
 ┃ ┃ ┃ ┣ 📜student.types.ts
 ┃ ┃ ┃ ┗ 📜student.validator.ts
 ┃ ┃ ┗ 📂User
 ┃ ┃ ┃ ┣ 📜user.controller.ts
 ┃ ┃ ┃ ┣ 📜user.model.ts
 ┃ ┃ ┃ ┣ 📜user.routes.ts
 ┃ ┃ ┃ ┣ 📜user.service.ts
 ┃ ┃ ┃ ┣ 📜user.types.ts
 ┃ ┃ ┃ ┣ 📜user.utils.ts
 ┃ ┃ ┃ ┗ 📜user.validator.ts
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜catchAsync.ts
 ┃ ┃ ┣ 📜createRouter.ts
 ┃ ┃ ┣ 📜getCurrentDateTime.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜isValidObjectId.ts
 ┃ ┃ ┗ 📜sendResponse.ts
 ┃ ┗ 📜index.ts
 ┣ 📜.gitignore
 ┣ 📜.nvmrc
 ┣ 📜eslint.config.mjs
 ┣ 📜LICENSE
 ┣ 📜package.json
 ┣ 📜prettier.config.mjs
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┗ 📜vercel.json
```
