import AcademicYear from './AcademicYear'
import SearchAcademicYearController from './SearchAcademicYearController'
import VocationalProgramController from './VocationalProgramController'
import StudentClassController from './StudentClassController'
import SearchVocationalProgramController from './SearchVocationalProgramController'
import StudentController from './StudentController'
import PointThresholdController from './PointThresholdController'
import ViolationTypeController from './ViolationTypeController'
import RewardTypeController from './RewardTypeController'
const Controllers = {
    AcademicYear: Object.assign(AcademicYear, AcademicYear),
SearchAcademicYearController: Object.assign(SearchAcademicYearController, SearchAcademicYearController),
VocationalProgramController: Object.assign(VocationalProgramController, VocationalProgramController),
StudentClassController: Object.assign(StudentClassController, StudentClassController),
SearchVocationalProgramController: Object.assign(SearchVocationalProgramController, SearchVocationalProgramController),
StudentController: Object.assign(StudentController, StudentController),
PointThresholdController: Object.assign(PointThresholdController, PointThresholdController),
ViolationTypeController: Object.assign(ViolationTypeController, ViolationTypeController),
RewardTypeController: Object.assign(RewardTypeController, RewardTypeController),
}

export default Controllers