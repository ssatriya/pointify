import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import approval from './approval'
/**
* @see \App\Http\Controllers\RevokeViolationController::__invoke
 * @see app/Http/Controllers/RevokeViolationController.php:18
 * @route '/dashboard/violations/revoke/{violation}'
 */
export const revoke = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: revoke.url(args, options),
    method: 'put',
})

revoke.definition = {
    methods: ["put"],
    url: '/dashboard/violations/revoke/{violation}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RevokeViolationController::__invoke
 * @see app/Http/Controllers/RevokeViolationController.php:18
 * @route '/dashboard/violations/revoke/{violation}'
 */
revoke.url = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return revoke.definition.url
            .replace('{violation}', parsedArgs.violation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RevokeViolationController::__invoke
 * @see app/Http/Controllers/RevokeViolationController.php:18
 * @route '/dashboard/violations/revoke/{violation}'
 */
revoke.put = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: revoke.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\RevokeViolationController::__invoke
 * @see app/Http/Controllers/RevokeViolationController.php:18
 * @route '/dashboard/violations/revoke/{violation}'
 */
    const revokeForm = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: revoke.url(args, {
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
        revokeForm.put = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: revoke.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    revoke.form = revokeForm
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
revoke: Object.assign(revoke, revoke),
store: Object.assign(store, store),
}

export default violations