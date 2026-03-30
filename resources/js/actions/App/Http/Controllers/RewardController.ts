import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RewardController::__invoke
 * @see app/Http/Controllers/RewardController.php:22
 * @route '/dashboard/rewards'
 */
const RewardController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RewardController.url(options),
    method: 'post',
})

RewardController.definition = {
    methods: ["post"],
    url: '/dashboard/rewards',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RewardController::__invoke
 * @see app/Http/Controllers/RewardController.php:22
 * @route '/dashboard/rewards'
 */
RewardController.url = (options?: RouteQueryOptions) => {
    return RewardController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RewardController::__invoke
 * @see app/Http/Controllers/RewardController.php:22
 * @route '/dashboard/rewards'
 */
RewardController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RewardController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RewardController::__invoke
 * @see app/Http/Controllers/RewardController.php:22
 * @route '/dashboard/rewards'
 */
    const RewardControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: RewardController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RewardController::__invoke
 * @see app/Http/Controllers/RewardController.php:22
 * @route '/dashboard/rewards'
 */
        RewardControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RewardController.url(options),
            method: 'post',
        })
    
    RewardController.form = RewardControllerForm
export default RewardController