import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\StudentClassController::index
 * @see app/Http/Controllers/StudentClassController.php:36
 * @route '/dashboard/classes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/classes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentClassController::index
 * @see app/Http/Controllers/StudentClassController.php:36
 * @route '/dashboard/classes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentClassController::index
 * @see app/Http/Controllers/StudentClassController.php:36
 * @route '/dashboard/classes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentClassController::index
 * @see app/Http/Controllers/StudentClassController.php:36
 * @route '/dashboard/classes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentClassController::index
 * @see app/Http/Controllers/StudentClassController.php:36
 * @route '/dashboard/classes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentClassController::index
 * @see app/Http/Controllers/StudentClassController.php:36
 * @route '/dashboard/classes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentClassController::index
 * @see app/Http/Controllers/StudentClassController.php:36
 * @route '/dashboard/classes'
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
* @see \App\Http\Controllers\StudentClassController::store
 * @see app/Http/Controllers/StudentClassController.php:55
 * @route '/dashboard/classes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/classes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StudentClassController::store
 * @see app/Http/Controllers/StudentClassController.php:55
 * @route '/dashboard/classes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentClassController::store
 * @see app/Http/Controllers/StudentClassController.php:55
 * @route '/dashboard/classes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StudentClassController::store
 * @see app/Http/Controllers/StudentClassController.php:55
 * @route '/dashboard/classes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentClassController::store
 * @see app/Http/Controllers/StudentClassController.php:55
 * @route '/dashboard/classes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
export const show = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/classes/{studentClass}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
show.url = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentClass: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { studentClass: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    studentClass: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentClass: typeof args.studentClass === 'object'
                ? args.studentClass.id
                : args.studentClass,
                }

    return show.definition.url
            .replace('{studentClass}', parsedArgs.studentClass.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
show.get = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
show.head = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
    const showForm = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
        showForm.get = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
        showForm.head = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\StudentClassController::update
 * @see app/Http/Controllers/StudentClassController.php:89
 * @route '/dashboard/classes/{studentClass}'
 */
export const update = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/classes/{studentClass}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\StudentClassController::update
 * @see app/Http/Controllers/StudentClassController.php:89
 * @route '/dashboard/classes/{studentClass}'
 */
update.url = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentClass: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { studentClass: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    studentClass: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentClass: typeof args.studentClass === 'object'
                ? args.studentClass.id
                : args.studentClass,
                }

    return update.definition.url
            .replace('{studentClass}', parsedArgs.studentClass.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentClassController::update
 * @see app/Http/Controllers/StudentClassController.php:89
 * @route '/dashboard/classes/{studentClass}'
 */
update.put = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\StudentClassController::update
 * @see app/Http/Controllers/StudentClassController.php:89
 * @route '/dashboard/classes/{studentClass}'
 */
    const updateForm = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentClassController::update
 * @see app/Http/Controllers/StudentClassController.php:89
 * @route '/dashboard/classes/{studentClass}'
 */
        updateForm.put = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\StudentClassController::destroy
 * @see app/Http/Controllers/StudentClassController.php:107
 * @route '/dashboard/classes/{studentClass}'
 */
export const destroy = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/classes/{studentClass}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StudentClassController::destroy
 * @see app/Http/Controllers/StudentClassController.php:107
 * @route '/dashboard/classes/{studentClass}'
 */
destroy.url = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentClass: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { studentClass: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    studentClass: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentClass: typeof args.studentClass === 'object'
                ? args.studentClass.id
                : args.studentClass,
                }

    return destroy.definition.url
            .replace('{studentClass}', parsedArgs.studentClass.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentClassController::destroy
 * @see app/Http/Controllers/StudentClassController.php:107
 * @route '/dashboard/classes/{studentClass}'
 */
destroy.delete = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\StudentClassController::destroy
 * @see app/Http/Controllers/StudentClassController.php:107
 * @route '/dashboard/classes/{studentClass}'
 */
    const destroyForm = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentClassController::destroy
 * @see app/Http/Controllers/StudentClassController.php:107
 * @route '/dashboard/classes/{studentClass}'
 */
        destroyForm.delete = (args: { studentClass: string | { id: string } } | [studentClass: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const StudentClassController = { index, store, show, update, destroy }

export default StudentClassController