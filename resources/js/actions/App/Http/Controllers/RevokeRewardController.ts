import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RevokeRewardController::__invoke
 * @see app/Http/Controllers/RevokeRewardController.php:18
 * @route '/dashboard/rewards/revoke/{reward}'
 */
const RevokeRewardController = (args: { reward: string | number | { id: string | number } } | [reward: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RevokeRewardController.url(args, options),
    method: 'post',
})

RevokeRewardController.definition = {
    methods: ["post"],
    url: '/dashboard/rewards/revoke/{reward}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RevokeRewardController::__invoke
 * @see app/Http/Controllers/RevokeRewardController.php:18
 * @route '/dashboard/rewards/revoke/{reward}'
 */
RevokeRewardController.url = (args: { reward: string | number | { id: string | number } } | [reward: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return RevokeRewardController.definition.url
            .replace('{reward}', parsedArgs.reward.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RevokeRewardController::__invoke
 * @see app/Http/Controllers/RevokeRewardController.php:18
 * @route '/dashboard/rewards/revoke/{reward}'
 */
RevokeRewardController.post = (args: { reward: string | number | { id: string | number } } | [reward: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RevokeRewardController.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RevokeRewardController::__invoke
 * @see app/Http/Controllers/RevokeRewardController.php:18
 * @route '/dashboard/rewards/revoke/{reward}'
 */
    const RevokeRewardControllerForm = (args: { reward: string | number | { id: string | number } } | [reward: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: RevokeRewardController.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RevokeRewardController::__invoke
 * @see app/Http/Controllers/RevokeRewardController.php:18
 * @route '/dashboard/rewards/revoke/{reward}'
 */
        RevokeRewardControllerForm.post = (args: { reward: string | number | { id: string | number } } | [reward: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RevokeRewardController.url(args, options),
            method: 'post',
        })
    
    RevokeRewardController.form = RevokeRewardControllerForm
export default RevokeRewardController