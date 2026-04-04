import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
* @see \App\Http\Controllers\ReorderStudentClassController::__invoke
 * @see app/Http/Controllers/ReorderStudentClassController.php:23
 * @route '/dashboard/classes/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: reorder.url(options),
    method: 'put',
})

reorder.definition = {
    methods: ["put"],
    url: '/dashboard/classes/reorder',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ReorderStudentClassController::__invoke
 * @see app/Http/Controllers/ReorderStudentClassController.php:23
 * @route '/dashboard/classes/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReorderStudentClassController::__invoke
 * @see app/Http/Controllers/ReorderStudentClassController.php:23
 * @route '/dashboard/classes/reorder'
 */
reorder.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: reorder.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ReorderStudentClassController::__invoke
 * @see app/Http/Controllers/ReorderStudentClassController.php:23
 * @route '/dashboard/classes/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ReorderStudentClassController::__invoke
 * @see app/Http/Controllers/ReorderStudentClassController.php:23
 * @route '/dashboard/classes/reorder'
 */
        reorderForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    reorder.form = reorderForm
/**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/dashboard/classes/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SearchVocationalProgramController::__invoke
 * @see app/Http/Controllers/SearchVocationalProgramController.php:20
 * @route '/dashboard/classes/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
/**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
export const show = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
show.url = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
show.get = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
show.head = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
    const showForm = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
        showForm.get = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentClassController::show
 * @see app/Http/Controllers/StudentClassController.php:71
 * @route '/dashboard/classes/{studentClass}'
 */
        showForm.head = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
export const update = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
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
update.url = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
update.put = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\StudentClassController::update
 * @see app/Http/Controllers/StudentClassController.php:89
 * @route '/dashboard/classes/{studentClass}'
 */
    const updateForm = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
        updateForm.put = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
export const destroy = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
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
destroy.url = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
destroy.delete = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\StudentClassController::destroy
 * @see app/Http/Controllers/StudentClassController.php:107
 * @route '/dashboard/classes/{studentClass}'
 */
    const destroyForm = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
        destroyForm.delete = (args: { studentClass: string | number | { id: string | number } } | [studentClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const studentClasses = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
reorder: Object.assign(reorder, reorder),
search: Object.assign(search, search),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default studentClasses