import ActiveAcademicYearController from './ActiveAcademicYearController'
import AcademicYear from './AcademicYear'
import SearchAcademicYearController from './SearchAcademicYearController'
import VocationalProgramController from './VocationalProgramController'
import StudentClassController from './StudentClassController'
import SearchVocationalProgramController from './SearchVocationalProgramController'
import SearchStudentEnrollmentController from './SearchStudentEnrollmentController'
import StudentEnrollmentController from './StudentEnrollmentController'
import SearchUnenrolledStudentController from './SearchUnenrolledStudentController'
import StudentController from './StudentController'
import PointThresholdController from './PointThresholdController'
import ViolationTypeController from './ViolationTypeController'
import RewardTypeController from './RewardTypeController'
const Controllers = {
    ActiveAcademicYearController: Object.assign(ActiveAcademicYearController, ActiveAcademicYearController),
AcademicYear: Object.assign(AcademicYear, AcademicYear),
SearchAcademicYearController: Object.assign(SearchAcademicYearController, SearchAcademicYearController),
VocationalProgramController: Object.assign(VocationalProgramController, VocationalProgramController),
StudentClassController: Object.assign(StudentClassController, StudentClassController),
SearchVocationalProgramController: Object.assign(SearchVocationalProgramController, SearchVocationalProgramController),
SearchStudentEnrollmentController: Object.assign(SearchStudentEnrollmentController, SearchStudentEnrollmentController),
StudentEnrollmentController: Object.assign(StudentEnrollmentController, StudentEnrollmentController),
SearchUnenrolledStudentController: Object.assign(SearchUnenrolledStudentController, SearchUnenrolledStudentController),
StudentController: Object.assign(StudentController, StudentController),
PointThresholdController: Object.assign(PointThresholdController, PointThresholdController),
ViolationTypeController: Object.assign(ViolationTypeController, ViolationTypeController),
RewardTypeController: Object.assign(RewardTypeController, RewardTypeController),
}

export default Controllers