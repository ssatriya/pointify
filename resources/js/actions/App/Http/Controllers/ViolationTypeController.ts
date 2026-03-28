import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ViolationTypeController::index
 * @see app/Http/Controllers/ViolationTypeController.php:33
 * @route '/dashboard/violation-types'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/violation-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ViolationTypeController::index
 * @see app/Http/Controllers/ViolationTypeController.php:33
 * @route '/dashboard/violation-types'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ViolationTypeController::index
 * @see app/Http/Controllers/ViolationTypeController.php:33
 * @route '/dashboard/violation-types'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ViolationTypeController::index
 * @see app/Http/Controllers/ViolationTypeController.php:33
 * @route '/dashboard/violation-types'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ViolationTypeController::index
 * @see app/Http/Controllers/ViolationTypeController.php:33
 * @route '/dashboard/violation-types'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ViolationTypeController::index
 * @see app/Http/Controllers/ViolationTypeController.php:33
 * @route '/dashboard/violation-types'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ViolationTypeController::index
 * @see app/Http/Controllers/ViolationTypeController.php:33
 * @route '/dashboard/violation-types'
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
* @see \App\Http\Controllers\ViolationTypeController::store
 * @see app/Http/Controllers/ViolationTypeController.php:45
 * @route '/dashboard/violation-types'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/violation-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ViolationTypeController::store
 * @see app/Http/Controllers/ViolationTypeController.php:45
 * @route '/dashboard/violation-types'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ViolationTypeController::store
 * @see app/Http/Controllers/ViolationTypeController.php:45
 * @route '/dashboard/violation-types'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ViolationTypeController::store
 * @see app/Http/Controllers/ViolationTypeController.php:45
 * @route '/dashboard/violation-types'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ViolationTypeController::store
 * @see app/Http/Controllers/ViolationTypeController.php:45
 * @route '/dashboard/violation-types'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ViolationTypeController::show
 * @see app/Http/Controllers/ViolationTypeController.php:62
 * @route '/dashboard/violation-types/{violationType}'
 */
export const show = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/violation-types/{violationType}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ViolationTypeController::show
 * @see app/Http/Controllers/ViolationTypeController.php:62
 * @route '/dashboard/violation-types/{violationType}'
 */
show.url = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { violationType: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { violationType: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    violationType: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        violationType: typeof args.violationType === 'object'
                ? args.violationType.id
                : args.violationType,
                }

    return show.definition.url
            .replace('{violationType}', parsedArgs.violationType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ViolationTypeController::show
 * @see app/Http/Controllers/ViolationTypeController.php:62
 * @route '/dashboard/violation-types/{violationType}'
 */
show.get = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ViolationTypeController::show
 * @see app/Http/Controllers/ViolationTypeController.php:62
 * @route '/dashboard/violation-types/{violationType}'
 */
show.head = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ViolationTypeController::show
 * @see app/Http/Controllers/ViolationTypeController.php:62
 * @route '/dashboard/violation-types/{violationType}'
 */
    const showForm = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ViolationTypeController::show
 * @see app/Http/Controllers/ViolationTypeController.php:62
 * @route '/dashboard/violation-types/{violationType}'
 */
        showForm.get = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ViolationTypeController::show
 * @see app/Http/Controllers/ViolationTypeController.php:62
 * @route '/dashboard/violation-types/{violationType}'
 */
        showForm.head = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ViolationTypeController::update
 * @see app/Http/Controllers/ViolationTypeController.php:72
 * @route '/dashboard/violation-types/{violationType}'
 */
export const update = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/violation-types/{violationType}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ViolationTypeController::update
 * @see app/Http/Controllers/ViolationTypeController.php:72
 * @route '/dashboard/violation-types/{violationType}'
 */
update.url = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { violationType: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { violationType: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    violationType: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        violationType: typeof args.violationType === 'object'
                ? args.violationType.id
                : args.violationType,
                }

    return update.definition.url
            .replace('{violationType}', parsedArgs.violationType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ViolationTypeController::update
 * @see app/Http/Controllers/ViolationTypeController.php:72
 * @route '/dashboard/violation-types/{violationType}'
 */
update.put = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ViolationTypeController::update
 * @see app/Http/Controllers/ViolationTypeController.php:72
 * @route '/dashboard/violation-types/{violationType}'
 */
    const updateForm = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ViolationTypeController::update
 * @see app/Http/Controllers/ViolationTypeController.php:72
 * @route '/dashboard/violation-types/{violationType}'
 */
        updateForm.put = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ViolationTypeController::destroy
 * @see app/Http/Controllers/ViolationTypeController.php:82
 * @route '/dashboard/violation-types/{violationType}'
 */
export const destroy = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/violation-types/{violationType}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ViolationTypeController::destroy
 * @see app/Http/Controllers/ViolationTypeController.php:82
 * @route '/dashboard/violation-types/{violationType}'
 */
destroy.url = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { violationType: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { violationType: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    violationType: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        violationType: typeof args.violationType === 'object'
                ? args.violationType.id
                : args.violationType,
                }

    return destroy.definition.url
            .replace('{violationType}', parsedArgs.violationType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ViolationTypeController::destroy
 * @see app/Http/Controllers/ViolationTypeController.php:82
 * @route '/dashboard/violation-types/{violationType}'
 */
destroy.delete = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ViolationTypeController::destroy
 * @see app/Http/Controllers/ViolationTypeController.php:82
 * @route '/dashboard/violation-types/{violationType}'
 */
    const destroyForm = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ViolationTypeController::destroy
 * @see app/Http/Controllers/ViolationTypeController.php:82
 * @route '/dashboard/violation-types/{violationType}'
 */
        destroyForm.delete = (args: { violationType: string | number | { id: string | number } } | [violationType: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ViolationTypeController = { index, store, show, update, destroy }

export default ViolationTypeController