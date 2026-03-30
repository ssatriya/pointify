import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SearchRewardTypeController::__invoke
 * @see app/Http/Controllers/SearchRewardTypeController.php:23
 * @route '/dashboard/reward-types/search'
 */
const SearchRewardTypeController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchRewardTypeController.url(options),
    method: 'get',
})

SearchRewardTypeController.definition = {
    methods: ["get","head"],
    url: '/dashboard/reward-types/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchRewardTypeController::__invoke
 * @see app/Http/Controllers/SearchRewardTypeController.php:23
 * @route '/dashboard/reward-types/search'
 */
SearchRewardTypeController.url = (options?: RouteQueryOptions) => {
    return SearchRewardTypeController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchRewardTypeController::__invoke
 * @see app/Http/Controllers/SearchRewardTypeController.php:23
 * @route '/dashboard/reward-types/search'
 */
SearchRewardTypeController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchRewardTypeController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SearchRewardTypeController::__invoke
 * @see app/Http/Controllers/SearchRewardTypeController.php:23
 * @route '/dashboard/reward-types/search'
 */
SearchRewardTypeController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: SearchRewardTypeController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SearchRewardTypeController::__invoke
 * @see app/Http/Controllers/SearchRewardTypeController.php:23
 * @route '/dashboard/reward-types/search'
 */
    const SearchRewardTypeControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: SearchRewardTypeController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SearchRewardTypeController::__invoke
 * @see app/Http/Controllers/SearchRewardTypeController.php:23
 * @route '/dashboard/reward-types/search'
 */
        SearchRewardTypeControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchRewardTypeController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SearchRewardTypeController::__invoke
 * @see app/Http/Controllers/SearchRewardTypeController.php:23
 * @route '/dashboard/reward-types/search'
 */
        SearchRewardTypeControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchRewardTypeController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    SearchRewardTypeController.form = SearchRewardTypeControllerForm
export default SearchRewardTypeController