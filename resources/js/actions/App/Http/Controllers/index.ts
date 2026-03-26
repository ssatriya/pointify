import AcademicYear from './AcademicYear'
import VocationalProgramController from './VocationalProgramController'
import StudentClassController from './StudentClassController'
import SearchVocationalProgramController from './SearchVocationalProgramController'
const Controllers = {
    AcademicYear: Object.assign(AcademicYear, AcademicYear),
VocationalProgramController: Object.assign(VocationalProgramController, VocationalProgramController),
StudentClassController: Object.assign(StudentClassController, StudentClassController),
SearchVocationalProgramController: Object.assign(SearchVocationalProgramController, SearchVocationalProgramController),
}

export default Controllers