import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RevokeViolationController::__invoke
 * @see app/Http/Controllers/RevokeViolationController.php:18
 * @route '/dashboard/violations/revoke/{violation}'
 */
const RevokeViolationController = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RevokeViolationController.url(args, options),
    method: 'put',
})

RevokeViolationController.definition = {
    methods: ["put"],
    url: '/dashboard/violations/revoke/{violation}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RevokeViolationController::__invoke
 * @see app/Http/Controllers/RevokeViolationController.php:18
 * @route '/dashboard/violations/revoke/{violation}'
 */
RevokeViolationController.url = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { violation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { violation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    violation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        violation: typeof args.violation === 'object'
                ? args.violation.id
                : args.violation,
                }

    return RevokeViolationController.definition.url
            .replace('{violation}', parsedArgs.violation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RevokeViolationController::__invoke
 * @see app/Http/Controllers/RevokeViolationController.php:18
 * @route '/dashboard/violations/revoke/{violation}'
 */
RevokeViolationController.put = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RevokeViolationController.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\RevokeViolationController::__invoke
 * @see app/Http/Controllers/RevokeViolationController.php:18
 * @route '/dashboard/violations/revoke/{violation}'
 */
    const RevokeViolationControllerForm = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: RevokeViolationController.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RevokeViolationController::__invoke
 * @see app/Http/Controllers/RevokeViolationController.php:18
 * @route '/dashboard/violations/revoke/{violation}'
 */
        RevokeViolationControllerForm.put = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RevokeViolationController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    RevokeViolationController.form = RevokeViolationControllerForm
export default RevokeViolationController