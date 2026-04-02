import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\VocationalProgramController::index
 * @see app/Http/Controllers/VocationalProgramController.php:32
 * @route '/dashboard/vocational-programs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/vocational-programs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VocationalProgramController::index
 * @see app/Http/Controllers/VocationalProgramController.php:32
 * @route '/dashboard/vocational-programs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VocationalProgramController::index
 * @see app/Http/Controllers/VocationalProgramController.php:32
 * @route '/dashboard/vocational-programs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VocationalProgramController::index
 * @see app/Http/Controllers/VocationalProgramController.php:32
 * @route '/dashboard/vocational-programs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VocationalProgramController::index
 * @see app/Http/Controllers/VocationalProgramController.php:32
 * @route '/dashboard/vocational-programs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VocationalProgramController::index
 * @see app/Http/Controllers/VocationalProgramController.php:32
 * @route '/dashboard/vocational-programs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VocationalProgramController::index
 * @see app/Http/Controllers/VocationalProgramController.php:32
 * @route '/dashboard/vocational-programs'
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
* @see \App\Http\Controllers\VocationalProgramController::store
 * @see app/Http/Controllers/VocationalProgramController.php:51
 * @route '/dashboard/vocational-programs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/vocational-programs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VocationalProgramController::store
 * @see app/Http/Controllers/VocationalProgramController.php:51
 * @route '/dashboard/vocational-programs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VocationalProgramController::store
 * @see app/Http/Controllers/VocationalProgramController.php:51
 * @route '/dashboard/vocational-programs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VocationalProgramController::store
 * @see app/Http/Controllers/VocationalProgramController.php:51
 * @route '/dashboard/vocational-programs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VocationalProgramController::store
 * @see app/Http/Controllers/VocationalProgramController.php:51
 * @route '/dashboard/vocational-programs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\VocationalProgramController::show
 * @see app/Http/Controllers/VocationalProgramController.php:70
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
export const show = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/vocational-programs/{vocationalProgram}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VocationalProgramController::show
 * @see app/Http/Controllers/VocationalProgramController.php:70
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
show.url = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vocationalProgram: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { vocationalProgram: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    vocationalProgram: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        vocationalProgram: typeof args.vocationalProgram === 'object'
                ? args.vocationalProgram.id
                : args.vocationalProgram,
                }

    return show.definition.url
            .replace('{vocationalProgram}', parsedArgs.vocationalProgram.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VocationalProgramController::show
 * @see app/Http/Controllers/VocationalProgramController.php:70
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
show.get = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VocationalProgramController::show
 * @see app/Http/Controllers/VocationalProgramController.php:70
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
show.head = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VocationalProgramController::show
 * @see app/Http/Controllers/VocationalProgramController.php:70
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
    const showForm = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VocationalProgramController::show
 * @see app/Http/Controllers/VocationalProgramController.php:70
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
        showForm.get = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VocationalProgramController::show
 * @see app/Http/Controllers/VocationalProgramController.php:70
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
        showForm.head = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\VocationalProgramController::update
 * @see app/Http/Controllers/VocationalProgramController.php:89
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
export const update = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/vocational-programs/{vocationalProgram}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\VocationalProgramController::update
 * @see app/Http/Controllers/VocationalProgramController.php:89
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
update.url = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vocationalProgram: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { vocationalProgram: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    vocationalProgram: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        vocationalProgram: typeof args.vocationalProgram === 'object'
                ? args.vocationalProgram.id
                : args.vocationalProgram,
                }

    return update.definition.url
            .replace('{vocationalProgram}', parsedArgs.vocationalProgram.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VocationalProgramController::update
 * @see app/Http/Controllers/VocationalProgramController.php:89
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
update.put = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\VocationalProgramController::update
 * @see app/Http/Controllers/VocationalProgramController.php:89
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
    const updateForm = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VocationalProgramController::update
 * @see app/Http/Controllers/VocationalProgramController.php:89
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
        updateForm.put = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\VocationalProgramController::destroy
 * @see app/Http/Controllers/VocationalProgramController.php:107
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
export const destroy = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/vocational-programs/{vocationalProgram}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VocationalProgramController::destroy
 * @see app/Http/Controllers/VocationalProgramController.php:107
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
destroy.url = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vocationalProgram: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { vocationalProgram: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    vocationalProgram: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        vocationalProgram: typeof args.vocationalProgram === 'object'
                ? args.vocationalProgram.id
                : args.vocationalProgram,
                }

    return destroy.definition.url
            .replace('{vocationalProgram}', parsedArgs.vocationalProgram.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VocationalProgramController::destroy
 * @see app/Http/Controllers/VocationalProgramController.php:107
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
destroy.delete = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\VocationalProgramController::destroy
 * @see app/Http/Controllers/VocationalProgramController.php:107
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
    const destroyForm = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VocationalProgramController::destroy
 * @see app/Http/Controllers/VocationalProgramController.php:107
 * @route '/dashboard/vocational-programs/{vocationalProgram}'
 */
        destroyForm.delete = (args: { vocationalProgram: string | number | { id: string | number } } | [vocationalProgram: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const vocationalPrograms = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default vocationalPrograms