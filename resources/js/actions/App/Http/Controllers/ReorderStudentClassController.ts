import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReorderStudentClassController::__invoke
 * @see app/Http/Controllers/ReorderStudentClassController.php:23
 * @route '/dashboard/classes/reorder'
 */
const ReorderStudentClassController = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: ReorderStudentClassController.url(options),
    method: 'put',
})

ReorderStudentClassController.definition = {
    methods: ["put"],
    url: '/dashboard/classes/reorder',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ReorderStudentClassController::__invoke
 * @see app/Http/Controllers/ReorderStudentClassController.php:23
 * @route '/dashboard/classes/reorder'
 */
ReorderStudentClassController.url = (options?: RouteQueryOptions) => {
    return ReorderStudentClassController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReorderStudentClassController::__invoke
 * @see app/Http/Controllers/ReorderStudentClassController.php:23
 * @route '/dashboard/classes/reorder'
 */
ReorderStudentClassController.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: ReorderStudentClassController.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ReorderStudentClassController::__invoke
 * @see app/Http/Controllers/ReorderStudentClassController.php:23
 * @route '/dashboard/classes/reorder'
 */
    const ReorderStudentClassControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ReorderStudentClassController.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ReorderStudentClassController::__invoke
 * @see app/Http/Controllers/ReorderStudentClassController.php:23
 * @route '/dashboard/classes/reorder'
 */
        ReorderStudentClassControllerForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ReorderStudentClassController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    ReorderStudentClassController.form = ReorderStudentClassControllerForm
export default ReorderStudentClassController