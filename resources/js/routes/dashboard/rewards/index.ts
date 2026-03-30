import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RewardController::__invoke
 * @see app/Http/Controllers/RewardController.php:22
 * @route '/dashboard/rewards'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/rewards',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RewardController::__invoke
 * @see app/Http/Controllers/RewardController.php:22
 * @route '/dashboard/rewards'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RewardController::__invoke
 * @see app/Http/Controllers/RewardController.php:22
 * @route '/dashboard/rewards'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RewardController::__invoke
 * @see app/Http/Controllers/RewardController.php:22
 * @route '/dashboard/rewards'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RewardController::__invoke
 * @see app/Http/Controllers/RewardController.php:22
 * @route '/dashboard/rewards'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const rewards = {
    store: Object.assign(store, store),
}

export default rewards