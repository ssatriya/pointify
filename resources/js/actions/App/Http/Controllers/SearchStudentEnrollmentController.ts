import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
const SearchStudentEnrollmentController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchStudentEnrollmentController.url(options),
    method: 'get',
})

SearchStudentEnrollmentController.definition = {
    methods: ["get","head"],
    url: '/dashboard/student-enrollments/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
SearchStudentEnrollmentController.url = (options?: RouteQueryOptions) => {
    return SearchStudentEnrollmentController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
SearchStudentEnrollmentController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchStudentEnrollmentController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
SearchStudentEnrollmentController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: SearchStudentEnrollmentController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
    const SearchStudentEnrollmentControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: SearchStudentEnrollmentController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
        SearchStudentEnrollmentControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchStudentEnrollmentController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
        SearchStudentEnrollmentControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchStudentEnrollmentController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    SearchStudentEnrollmentController.form = SearchStudentEnrollmentControllerForm
export default SearchStudentEnrollmentController