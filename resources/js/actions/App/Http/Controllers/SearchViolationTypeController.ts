import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SearchViolationTypeController::__invoke
 * @see app/Http/Controllers/SearchViolationTypeController.php:23
 * @route '/dashboard/violation-types/search'
 */
const SearchViolationTypeController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchViolationTypeController.url(options),
    method: 'get',
})

SearchViolationTypeController.definition = {
    methods: ["get","head"],
    url: '/dashboard/violation-types/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchViolationTypeController::__invoke
 * @see app/Http/Controllers/SearchViolationTypeController.php:23
 * @route '/dashboard/violation-types/search'
 */
SearchViolationTypeController.url = (options?: RouteQueryOptions) => {
    return SearchViolationTypeController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchViolationTypeController::__invoke
 * @see app/Http/Controllers/SearchViolationTypeController.php:23
 * @route '/dashboard/violation-types/search'
 */
SearchViolationTypeController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchViolationTypeController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SearchViolationTypeController::__invoke
 * @see app/Http/Controllers/SearchViolationTypeController.php:23
 * @route '/dashboard/violation-types/search'
 */
SearchViolationTypeController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: SearchViolationTypeController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SearchViolationTypeController::__invoke
 * @see app/Http/Controllers/SearchViolationTypeController.php:23
 * @route '/dashboard/violation-types/search'
 */
    const SearchViolationTypeControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: SearchViolationTypeController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SearchViolationTypeController::__invoke
 * @see app/Http/Controllers/SearchViolationTypeController.php:23
 * @route '/dashboard/violation-types/search'
 */
        SearchViolationTypeControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchViolationTypeController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SearchViolationTypeController::__invoke
 * @see app/Http/Controllers/SearchViolationTypeController.php:23
 * @route '/dashboard/violation-types/search'
 */
        SearchViolationTypeControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchViolationTypeController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    SearchViolationTypeController.form = SearchViolationTypeControllerForm
export default SearchViolationTypeController