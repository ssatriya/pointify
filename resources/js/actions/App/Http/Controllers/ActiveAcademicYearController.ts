import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ActiveAcademicYearController::__invoke
 * @see app/Http/Controllers/ActiveAcademicYearController.php:19
 * @route '/dashboard/academic-years/active'
 */
const ActiveAcademicYearController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ActiveAcademicYearController.url(options),
    method: 'get',
})

ActiveAcademicYearController.definition = {
    methods: ["get","head"],
    url: '/dashboard/academic-years/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActiveAcademicYearController::__invoke
 * @see app/Http/Controllers/ActiveAcademicYearController.php:19
 * @route '/dashboard/academic-years/active'
 */
ActiveAcademicYearController.url = (options?: RouteQueryOptions) => {
    return ActiveAcademicYearController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActiveAcademicYearController::__invoke
 * @see app/Http/Controllers/ActiveAcademicYearController.php:19
 * @route '/dashboard/academic-years/active'
 */
ActiveAcademicYearController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ActiveAcademicYearController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ActiveAcademicYearController::__invoke
 * @see app/Http/Controllers/ActiveAcademicYearController.php:19
 * @route '/dashboard/academic-years/active'
 */
ActiveAcademicYearController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ActiveAcademicYearController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ActiveAcademicYearController::__invoke
 * @see app/Http/Controllers/ActiveAcademicYearController.php:19
 * @route '/dashboard/academic-years/active'
 */
    const ActiveAcademicYearControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ActiveAcademicYearController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ActiveAcademicYearController::__invoke
 * @see app/Http/Controllers/ActiveAcademicYearController.php:19
 * @route '/dashboard/academic-years/active'
 */
        ActiveAcademicYearControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ActiveAcademicYearController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ActiveAcademicYearController::__invoke
 * @see app/Http/Controllers/ActiveAcademicYearController.php:19
 * @route '/dashboard/academic-years/active'
 */
        ActiveAcademicYearControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ActiveAcademicYearController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ActiveAcademicYearController.form = ActiveAcademicYearControllerForm
export default ActiveAcademicYearController