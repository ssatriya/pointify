import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PointThresholdController::index
 * @see app/Http/Controllers/PointThresholdController.php:21
 * @route '/dashboard/point-thresholds'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/point-thresholds',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PointThresholdController::index
 * @see app/Http/Controllers/PointThresholdController.php:21
 * @route '/dashboard/point-thresholds'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PointThresholdController::index
 * @see app/Http/Controllers/PointThresholdController.php:21
 * @route '/dashboard/point-thresholds'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PointThresholdController::index
 * @see app/Http/Controllers/PointThresholdController.php:21
 * @route '/dashboard/point-thresholds'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PointThresholdController::index
 * @see app/Http/Controllers/PointThresholdController.php:21
 * @route '/dashboard/point-thresholds'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PointThresholdController::index
 * @see app/Http/Controllers/PointThresholdController.php:21
 * @route '/dashboard/point-thresholds'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PointThresholdController::index
 * @see app/Http/Controllers/PointThresholdController.php:21
 * @route '/dashboard/point-thresholds'
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
* @see \App\Http\Controllers\PointThresholdController::store
 * @see app/Http/Controllers/PointThresholdController.php:33
 * @route '/dashboard/point-thresholds'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/point-thresholds',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PointThresholdController::store
 * @see app/Http/Controllers/PointThresholdController.php:33
 * @route '/dashboard/point-thresholds'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PointThresholdController::store
 * @see app/Http/Controllers/PointThresholdController.php:33
 * @route '/dashboard/point-thresholds'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PointThresholdController::store
 * @see app/Http/Controllers/PointThresholdController.php:33
 * @route '/dashboard/point-thresholds'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PointThresholdController::store
 * @see app/Http/Controllers/PointThresholdController.php:33
 * @route '/dashboard/point-thresholds'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PointThresholdController::show
 * @see app/Http/Controllers/PointThresholdController.php:40
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
export const show = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/point-thresholds/{pointThreshold}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PointThresholdController::show
 * @see app/Http/Controllers/PointThresholdController.php:40
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
show.url = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pointThreshold: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { pointThreshold: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    pointThreshold: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pointThreshold: typeof args.pointThreshold === 'object'
                ? args.pointThreshold.id
                : args.pointThreshold,
                }

    return show.definition.url
            .replace('{pointThreshold}', parsedArgs.pointThreshold.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PointThresholdController::show
 * @see app/Http/Controllers/PointThresholdController.php:40
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
show.get = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PointThresholdController::show
 * @see app/Http/Controllers/PointThresholdController.php:40
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
show.head = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PointThresholdController::show
 * @see app/Http/Controllers/PointThresholdController.php:40
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
    const showForm = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PointThresholdController::show
 * @see app/Http/Controllers/PointThresholdController.php:40
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
        showForm.get = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PointThresholdController::show
 * @see app/Http/Controllers/PointThresholdController.php:40
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
        showForm.head = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PointThresholdController::update
 * @see app/Http/Controllers/PointThresholdController.php:50
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
export const update = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/point-thresholds/{pointThreshold}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PointThresholdController::update
 * @see app/Http/Controllers/PointThresholdController.php:50
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
update.url = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pointThreshold: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { pointThreshold: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    pointThreshold: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pointThreshold: typeof args.pointThreshold === 'object'
                ? args.pointThreshold.id
                : args.pointThreshold,
                }

    return update.definition.url
            .replace('{pointThreshold}', parsedArgs.pointThreshold.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PointThresholdController::update
 * @see app/Http/Controllers/PointThresholdController.php:50
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
update.put = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\PointThresholdController::update
 * @see app/Http/Controllers/PointThresholdController.php:50
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
    const updateForm = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PointThresholdController::update
 * @see app/Http/Controllers/PointThresholdController.php:50
 * @route '/dashboard/point-thresholds/{pointThreshold}'
 */
        updateForm.put = (args: { pointThreshold: string | { id: string } } | [pointThreshold: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const pointThresholds = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
}

export default pointThresholds