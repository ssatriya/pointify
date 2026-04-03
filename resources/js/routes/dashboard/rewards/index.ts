import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RevokeRewardController::__invoke
 * @see app/Http/Controllers/RevokeRewardController.php:18
 * @route '/dashboard/rewards/revoke/{reward}'
 */
export const revoke = (args: { reward: string | { id: string } } | [reward: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

revoke.definition = {
    methods: ["post"],
    url: '/dashboard/rewards/revoke/{reward}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RevokeRewardController::__invoke
 * @see app/Http/Controllers/RevokeRewardController.php:18
 * @route '/dashboard/rewards/revoke/{reward}'
 */
revoke.url = (args: { reward: string | { id: string } } | [reward: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reward: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reward: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reward: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reward: typeof args.reward === 'object'
                ? args.reward.id
                : args.reward,
                }

    return revoke.definition.url
            .replace('{reward}', parsedArgs.reward.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RevokeRewardController::__invoke
 * @see app/Http/Controllers/RevokeRewardController.php:18
 * @route '/dashboard/rewards/revoke/{reward}'
 */
revoke.post = (args: { reward: string | { id: string } } | [reward: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RevokeRewardController::__invoke
 * @see app/Http/Controllers/RevokeRewardController.php:18
 * @route '/dashboard/rewards/revoke/{reward}'
 */
    const revokeForm = (args: { reward: string | { id: string } } | [reward: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: revoke.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RevokeRewardController::__invoke
 * @see app/Http/Controllers/RevokeRewardController.php:18
 * @route '/dashboard/rewards/revoke/{reward}'
 */
        revokeForm.post = (args: { reward: string | { id: string } } | [reward: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: revoke.url(args, options),
            method: 'post',
        })
    
    revoke.form = revokeForm
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
    revoke: Object.assign(revoke, revoke),
store: Object.assign(store, store),
}

export default rewards