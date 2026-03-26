import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
const SearchVocationalProgramController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchVocationalProgramController.url(options),
    method: 'get',
})

SearchVocationalProgramController.definition = {
    methods: ["get","head"],
    url: '/dashboard/classes/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
SearchVocationalProgramController.url = (options?: RouteQueryOptions) => {
    return SearchVocationalProgramController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
SearchVocationalProgramController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchVocationalProgramController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
SearchVocationalProgramController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: SearchVocationalProgramController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
    const SearchVocationalProgramControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: SearchVocationalProgramController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
        SearchVocationalProgramControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchVocationalProgramController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
        SearchVocationalProgramControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchVocationalProgramController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    SearchVocationalProgramController.form = SearchVocationalProgramControllerForm
export default SearchVocationalProgramController