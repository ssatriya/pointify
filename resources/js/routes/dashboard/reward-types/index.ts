import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RewardTypeController::index
 * @see app/Http/Controllers/RewardTypeController.php:23
 * @route '/dashboard/reward-types'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/reward-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RewardTypeController::index
 * @see app/Http/Controllers/RewardTypeController.php:23
 * @route '/dashboard/reward-types'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RewardTypeController::index
 * @see app/Http/Controllers/RewardTypeController.php:23
 * @route '/dashboard/reward-types'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RewardTypeController::index
 * @see app/Http/Controllers/RewardTypeController.php:23
 * @route '/dashboard/reward-types'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RewardTypeController::index
 * @see app/Http/Controllers/RewardTypeController.php:23
 * @route '/dashboard/reward-types'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RewardTypeController::index
 * @see app/Http/Controllers/RewardTypeController.php:23
 * @route '/dashboard/reward-types'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RewardTypeController::index
 * @see app/Http/Controllers/RewardTypeController.php:23
 * @route '/dashboard/reward-types'
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
* @see \App\Http\Controllers\RewardTypeController::store
 * @see app/Http/Controllers/RewardTypeController.php:35
 * @route '/dashboard/reward-types'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/reward-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RewardTypeController::store
 * @see app/Http/Controllers/RewardTypeController.php:35
 * @route '/dashboard/reward-types'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RewardTypeController::store
 * @see app/Http/Controllers/RewardTypeController.php:35
 * @route '/dashboard/reward-types'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RewardTypeController::store
 * @see app/Http/Controllers/RewardTypeController.php:35
 * @route '/dashboard/reward-types'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RewardTypeController::store
 * @see app/Http/Controllers/RewardTypeController.php:35
 * @route '/dashboard/reward-types'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RewardTypeController::show
 * @see app/Http/Controllers/RewardTypeController.php:52
 * @route '/dashboard/reward-types/{rewardType}'
 */
export const show = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/reward-types/{rewardType}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RewardTypeController::show
 * @see app/Http/Controllers/RewardTypeController.php:52
 * @route '/dashboard/reward-types/{rewardType}'
 */
show.url = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rewardType: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { rewardType: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rewardType: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rewardType: typeof args.rewardType === 'object'
                ? args.rewardType.id
                : args.rewardType,
                }

    return show.definition.url
            .replace('{rewardType}', parsedArgs.rewardType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RewardTypeController::show
 * @see app/Http/Controllers/RewardTypeController.php:52
 * @route '/dashboard/reward-types/{rewardType}'
 */
show.get = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RewardTypeController::show
 * @see app/Http/Controllers/RewardTypeController.php:52
 * @route '/dashboard/reward-types/{rewardType}'
 */
show.head = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RewardTypeController::show
 * @see app/Http/Controllers/RewardTypeController.php:52
 * @route '/dashboard/reward-types/{rewardType}'
 */
    const showForm = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RewardTypeController::show
 * @see app/Http/Controllers/RewardTypeController.php:52
 * @route '/dashboard/reward-types/{rewardType}'
 */
        showForm.get = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RewardTypeController::show
 * @see app/Http/Controllers/RewardTypeController.php:52
 * @route '/dashboard/reward-types/{rewardType}'
 */
        showForm.head = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RewardTypeController::update
 * @see app/Http/Controllers/RewardTypeController.php:62
 * @route '/dashboard/reward-types/{rewardType}'
 */
export const update = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/reward-types/{rewardType}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RewardTypeController::update
 * @see app/Http/Controllers/RewardTypeController.php:62
 * @route '/dashboard/reward-types/{rewardType}'
 */
update.url = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rewardType: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { rewardType: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rewardType: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rewardType: typeof args.rewardType === 'object'
                ? args.rewardType.id
                : args.rewardType,
                }

    return update.definition.url
            .replace('{rewardType}', parsedArgs.rewardType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RewardTypeController::update
 * @see app/Http/Controllers/RewardTypeController.php:62
 * @route '/dashboard/reward-types/{rewardType}'
 */
update.put = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\RewardTypeController::update
 * @see app/Http/Controllers/RewardTypeController.php:62
 * @route '/dashboard/reward-types/{rewardType}'
 */
    const updateForm = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RewardTypeController::update
 * @see app/Http/Controllers/RewardTypeController.php:62
 * @route '/dashboard/reward-types/{rewardType}'
 */
        updateForm.put = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RewardTypeController::destroy
 * @see app/Http/Controllers/RewardTypeController.php:72
 * @route '/dashboard/reward-types/{rewardType}'
 */
export const destroy = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/reward-types/{rewardType}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RewardTypeController::destroy
 * @see app/Http/Controllers/RewardTypeController.php:72
 * @route '/dashboard/reward-types/{rewardType}'
 */
destroy.url = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rewardType: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { rewardType: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rewardType: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rewardType: typeof args.rewardType === 'object'
                ? args.rewardType.id
                : args.rewardType,
                }

    return destroy.definition.url
            .replace('{rewardType}', parsedArgs.rewardType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RewardTypeController::destroy
 * @see app/Http/Controllers/RewardTypeController.php:72
 * @route '/dashboard/reward-types/{rewardType}'
 */
destroy.delete = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RewardTypeController::destroy
 * @see app/Http/Controllers/RewardTypeController.php:72
 * @route '/dashboard/reward-types/{rewardType}'
 */
    const destroyForm = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RewardTypeController::destroy
 * @see app/Http/Controllers/RewardTypeController.php:72
 * @route '/dashboard/reward-types/{rewardType}'
 */
        destroyForm.delete = (args: { rewardType: string | { id: string } } | [rewardType: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const rewardTypes = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default rewardTypes