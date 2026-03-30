import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ViolationController::__invoke
 * @see app/Http/Controllers/ViolationController.php:18
 * @route '/dashboard/violations'
 */
const ViolationController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ViolationController.url(options),
    method: 'post',
})

ViolationController.definition = {
    methods: ["post"],
    url: '/dashboard/violations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ViolationController::__invoke
 * @see app/Http/Controllers/ViolationController.php:18
 * @route '/dashboard/violations'
 */
ViolationController.url = (options?: RouteQueryOptions) => {
    return ViolationController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ViolationController::__invoke
 * @see app/Http/Controllers/ViolationController.php:18
 * @route '/dashboard/violations'
 */
ViolationController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ViolationController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ViolationController::__invoke
 * @see app/Http/Controllers/ViolationController.php:18
 * @route '/dashboard/violations'
 */
    const ViolationControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ViolationController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ViolationController::__invoke
 * @see app/Http/Controllers/ViolationController.php:18
 * @route '/dashboard/violations'
 */
        ViolationControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ViolationController.url(options),
            method: 'post',
        })
    
    ViolationController.form = ViolationControllerForm
export default ViolationController