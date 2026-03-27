import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
const SearchUnenrolledStudentController = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchUnenrolledStudentController.url(args, options),
    method: 'get',
})

SearchUnenrolledStudentController.definition = {
    methods: ["get","head"],
    url: '/dashboard/students/select-unenrolled/{vocational_program}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
SearchUnenrolledStudentController.url = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vocational_program: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    vocational_program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        vocational_program: args.vocational_program,
                }

    return SearchUnenrolledStudentController.definition.url
            .replace('{vocational_program}', parsedArgs.vocational_program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
SearchUnenrolledStudentController.get = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchUnenrolledStudentController.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
SearchUnenrolledStudentController.head = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: SearchUnenrolledStudentController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
    const SearchUnenrolledStudentControllerForm = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: SearchUnenrolledStudentController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
        SearchUnenrolledStudentControllerForm.get = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchUnenrolledStudentController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
        SearchUnenrolledStudentControllerForm.head = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchUnenrolledStudentController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    SearchUnenrolledStudentController.form = SearchUnenrolledStudentControllerForm
export default SearchUnenrolledStudentController