import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SearchAcademicYearController::__invoke
 * @see app/Http/Controllers/SearchAcademicYearController.php:20
 * @route '/dashboard/academic-years/search'
 */
const SearchAcademicYearController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchAcademicYearController.url(options),
    method: 'get',
})

SearchAcademicYearController.definition = {
    methods: ["get","head"],
    url: '/dashboard/academic-years/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchAcademicYearController::__invoke
 * @see app/Http/Controllers/SearchAcademicYearController.php:20
 * @route '/dashboard/academic-years/search'
 */
SearchAcademicYearController.url = (options?: RouteQueryOptions) => {
    return SearchAcademicYearController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchAcademicYearController::__invoke
 * @see app/Http/Controllers/SearchAcademicYearController.php:20
 * @route '/dashboard/academic-years/search'
 */
SearchAcademicYearController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SearchAcademicYearController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SearchAcademicYearController::__invoke
 * @see app/Http/Controllers/SearchAcademicYearController.php:20
 * @route '/dashboard/academic-years/search'
 */
SearchAcademicYearController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: SearchAcademicYearController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SearchAcademicYearController::__invoke
 * @see app/Http/Controllers/SearchAcademicYearController.php:20
 * @route '/dashboard/academic-years/search'
 */
    const SearchAcademicYearControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: SearchAcademicYearController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SearchAcademicYearController::__invoke
 * @see app/Http/Controllers/SearchAcademicYearController.php:20
 * @route '/dashboard/academic-years/search'
 */
        SearchAcademicYearControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchAcademicYearController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SearchAcademicYearController::__invoke
 * @see app/Http/Controllers/SearchAcademicYearController.php:20
 * @route '/dashboard/academic-years/search'
 */
        SearchAcademicYearControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SearchAcademicYearController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    SearchAcademicYearController.form = SearchAcademicYearControllerForm
export default SearchAcademicYearController