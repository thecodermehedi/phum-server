// import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
// import { AcademicFacultyValidations } from './academicFaculty.validator';

const router = createRouter();

// router.post(
//   '/create-academic-faculty',
//   validateRequest(
//     AcademicFacultyValidations.createAcademicFacultyValidationSchema,
//   ),
//   AcademicFacultyControllers.createAcademicFaculty,
// );

// router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

// router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

// router.patch(
//   '/:facultyId',
//   validateRequest(
//     AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
//   ),
//   AcademicFacultyControllers.updateAcademicFaculty,
// );


export const AcademicFacultyRoutes = router;
