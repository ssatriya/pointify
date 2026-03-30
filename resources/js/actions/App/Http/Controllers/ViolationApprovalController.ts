import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ViolationApprovalController::index
 * @see app/Http/Controllers/ViolationApprovalController.php:20
 * @route '/dashboard/violations/approval'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/violations/approval',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ViolationApprovalController::index
 * @see app/Http/Controllers/ViolationApprovalController.php:20
 * @route '/dashboard/violations/approval'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ViolationApprovalController::index
 * @see app/Http/Controllers/ViolationApprovalController.php:20
 * @route '/dashboard/violations/approval'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ViolationApprovalController::index
 * @see app/Http/Controllers/ViolationApprovalController.php:20
 * @route '/dashboard/violations/approval'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ViolationApprovalController::index
 * @see app/Http/Controllers/ViolationApprovalController.php:20
 * @route '/dashboard/violations/approval'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ViolationApprovalController::index
 * @see app/Http/Controllers/ViolationApprovalController.php:20
 * @route '/dashboard/violations/approval'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ViolationApprovalController::index
 * @see app/Http/Controllers/ViolationApprovalController.php:20
 * @route '/dashboard/violations/approval'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ViolationApprovalController::update
 * @see app/Http/Controllers/ViolationApprovalController.php:39
 * @route '/dashboard/violations/approval/{violation}'
 */
export const update = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/dashboard/violations/approval/{violation}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ViolationApprovalController::update
 * @see app/Http/Controllers/ViolationApprovalController.php:39
 * @route '/dashboard/violations/approval/{violation}'
 */
update.url = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{violation}', parsedArgs.violation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ViolationApprovalController::update
 * @see app/Http/Controllers/ViolationApprovalController.php:39
 * @route '/dashboard/violations/approval/{violation}'
 */
update.patch = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ViolationApprovalController::update
 * @see app/Http/Controllers/ViolationApprovalController.php:39
 * @route '/dashboard/violations/approval/{violation}'
 */
    const updateForm = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ViolationApprovalController::update
 * @see app/Http/Controllers/ViolationApprovalController.php:39
 * @route '/dashboard/violations/approval/{violation}'
 */
        updateForm.patch = (args: { violation: string | { id: string } } | [violation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const ViolationApprovalController = { index, update }

export default ViolationApprovalController