import Settings from './Settings'
import ActiveAcademicYearController from './ActiveAcademicYearController'
import AcademicYear from './AcademicYear'
import SearchAcademicYearController from './SearchAcademicYearController'
import VocationalProgramController from './VocationalProgramController'
import StudentClassController from './StudentClassController'
import SearchVocationalProgramController from './SearchVocationalProgramController'
import SearchStudentEnrollmentController from './SearchStudentEnrollmentController'
import StudentEnrollmentController from './StudentEnrollmentController'
import SearchUnenrolledStudentController from './SearchUnenrolledStudentController'
import StudentImportController from './StudentImportController'
import StudentController from './StudentController'
import UserController from './UserController'
import PointThresholdController from './PointThresholdController'
import SearchViolationTypeController from './SearchViolationTypeController'
import ViolationTypeController from './ViolationTypeController'
import SearchRewardTypeController from './SearchRewardTypeController'
import RewardTypeController from './RewardTypeController'
import ViolationApprovalController from './ViolationApprovalController'
import ViolationController from './ViolationController'
import RewardController from './RewardController'
const Controllers = {
    Settings: Object.assign(Settings, Settings),
ActiveAcademicYearController: Object.assign(ActiveAcademicYearController, ActiveAcademicYearController),
AcademicYear: Object.assign(AcademicYear, AcademicYear),
SearchAcademicYearController: Object.assign(SearchAcademicYearController, SearchAcademicYearController),
VocationalProgramController: Object.assign(VocationalProgramController, VocationalProgramController),
StudentClassController: Object.assign(StudentClassController, StudentClassController),
SearchVocationalProgramController: Object.assign(SearchVocationalProgramController, SearchVocationalProgramController),
SearchStudentEnrollmentController: Object.assign(SearchStudentEnrollmentController, SearchStudentEnrollmentController),
StudentEnrollmentController: Object.assign(StudentEnrollmentController, StudentEnrollmentController),
SearchUnenrolledStudentController: Object.assign(SearchUnenrolledStudentController, SearchUnenrolledStudentController),
StudentImportController: Object.assign(StudentImportController, StudentImportController),
StudentController: Object.assign(StudentController, StudentController),
UserController: Object.assign(UserController, UserController),
PointThresholdController: Object.assign(PointThresholdController, PointThresholdController),
SearchViolationTypeController: Object.assign(SearchViolationTypeController, SearchViolationTypeController),
ViolationTypeController: Object.assign(ViolationTypeController, ViolationTypeController),
SearchRewardTypeController: Object.assign(SearchRewardTypeController, SearchRewardTypeController),
RewardTypeController: Object.assign(RewardTypeController, RewardTypeController),
ViolationApprovalController: Object.assign(ViolationApprovalController, ViolationApprovalController),
ViolationController: Object.assign(ViolationController, ViolationController),
RewardController: Object.assign(RewardController, RewardController),
}

export default Controllers