import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import approval from './approval'
/**
* @see \App\Http\Controllers\ViolationController::__invoke
 * @see app/Http/Controllers/ViolationController.php:18
 * @route '/dashboard/violations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/violations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ViolationController::__invoke
 * @see app/Http/Controllers/ViolationController.php:18
 * @route '/dashboard/violations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ViolationController::__invoke
 * @see app/Http/Controllers/ViolationController.php:18
 * @route '/dashboard/violations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ViolationController::__invoke
 * @see app/Http/Controllers/ViolationController.php:18
 * @route '/dashboard/violations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ViolationController::__invoke
 * @see app/Http/Controllers/ViolationController.php:18
 * @route '/dashboard/violations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const violations = {
    approval: Object.assign(approval, approval),
store: Object.assign(store, store),
}

export default violations