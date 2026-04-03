import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:82
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
export const show = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/student-enrollments/{studentEnrollment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:82
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
show.url = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentEnrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { studentEnrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    studentEnrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentEnrollment: typeof args.studentEnrollment === 'object'
                ? args.studentEnrollment.id
                : args.studentEnrollment,
                }

    return show.definition.url
            .replace('{studentEnrollment}', parsedArgs.studentEnrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:82
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
show.get = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:82
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
show.head = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:82
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
    const showForm = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:82
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
        showForm.get = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:82
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
        showForm.head = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\StudentEnrollmentController::update
 * @see app/Http/Controllers/StudentEnrollmentController.php:93
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
export const update = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/student-enrollments/{studentEnrollment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::update
 * @see app/Http/Controllers/StudentEnrollmentController.php:93
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
update.url = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentEnrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { studentEnrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    studentEnrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentEnrollment: typeof args.studentEnrollment === 'object'
                ? args.studentEnrollment.id
                : args.studentEnrollment,
                }

    return update.definition.url
            .replace('{studentEnrollment}', parsedArgs.studentEnrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentEnrollmentController::update
 * @see app/Http/Controllers/StudentEnrollmentController.php:93
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
update.put = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::update
 * @see app/Http/Controllers/StudentEnrollmentController.php:93
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
    const updateForm = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::update
 * @see app/Http/Controllers/StudentEnrollmentController.php:93
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
        updateForm.put = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\StudentEnrollmentController::destroy
 * @see app/Http/Controllers/StudentEnrollmentController.php:103
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
export const destroy = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/student-enrollments/{studentEnrollment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::destroy
 * @see app/Http/Controllers/StudentEnrollmentController.php:103
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
destroy.url = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentEnrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { studentEnrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    studentEnrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentEnrollment: typeof args.studentEnrollment === 'object'
                ? args.studentEnrollment.id
                : args.studentEnrollment,
                }

    return destroy.definition.url
            .replace('{studentEnrollment}', parsedArgs.studentEnrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentEnrollmentController::destroy
 * @see app/Http/Controllers/StudentEnrollmentController.php:103
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
destroy.delete = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::destroy
 * @see app/Http/Controllers/StudentEnrollmentController.php:103
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
    const destroyForm = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::destroy
 * @see app/Http/Controllers/StudentEnrollmentController.php:103
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
        destroyForm.delete = (args: { studentEnrollment: string | { id: string } } | [studentEnrollment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:25
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
export const index = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/student-enrollments/{studentClass}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:25
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
index.url = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentClass: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { studentClass: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    studentClass: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentClass: typeof args.studentClass === 'object'
                ? args.studentClass.slug
                : args.studentClass,
                }

    return index.definition.url
            .replace('{studentClass}', parsedArgs.studentClass.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:25
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
index.get = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:25
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
index.head = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:25
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
    const indexForm = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:25
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
        indexForm.get = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:25
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
        indexForm.head = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\StudentEnrollmentController::store
 * @see app/Http/Controllers/StudentEnrollmentController.php:70
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
export const store = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/student-enrollments/{studentClass}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::store
 * @see app/Http/Controllers/StudentEnrollmentController.php:70
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
store.url = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentClass: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { studentClass: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    studentClass: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentClass: typeof args.studentClass === 'object'
                ? args.studentClass.slug
                : args.studentClass,
                }

    return store.definition.url
            .replace('{studentClass}', parsedArgs.studentClass.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentEnrollmentController::store
 * @see app/Http/Controllers/StudentEnrollmentController.php:70
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
store.post = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::store
 * @see app/Http/Controllers/StudentEnrollmentController.php:70
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
    const storeForm = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::store
 * @see app/Http/Controllers/StudentEnrollmentController.php:70
 * @route '/dashboard/student-enrollments/{studentClass}'
 */
        storeForm.post = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:57
 * @route '/dashboard/student-enrollments/{studentClass}/reports'
 */
export const reports = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(args, options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/dashboard/student-enrollments/{studentClass}/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:57
 * @route '/dashboard/student-enrollments/{studentClass}/reports'
 */
reports.url = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentClass: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { studentClass: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    studentClass: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentClass: typeof args.studentClass === 'object'
                ? args.studentClass.slug
                : args.studentClass,
                }

    return reports.definition.url
            .replace('{studentClass}', parsedArgs.studentClass.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:57
 * @route '/dashboard/student-enrollments/{studentClass}/reports'
 */
reports.get = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:57
 * @route '/dashboard/student-enrollments/{studentClass}/reports'
 */
reports.head = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:57
 * @route '/dashboard/student-enrollments/{studentClass}/reports'
 */
    const reportsForm = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:57
 * @route '/dashboard/student-enrollments/{studentClass}/reports'
 */
        reportsForm.get = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:57
 * @route '/dashboard/student-enrollments/{studentClass}/reports'
 */
        reportsForm.head = (args: { studentClass: string | { slug: string } } | [studentClass: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
/**
* @see \App\Http\Controllers\StudentEnrollmentController::studentByEnrollment
 * @see app/Http/Controllers/StudentEnrollmentController.php:114
 * @route '/dashboard/student-enrollments/{studentClass}/{studentEnrollment}'
 */
export const studentByEnrollment = (args: { studentClass: string | { slug: string }, studentEnrollment: string | { id: string } } | [studentClass: string | { slug: string }, studentEnrollment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentByEnrollment.url(args, options),
    method: 'get',
})

studentByEnrollment.definition = {
    methods: ["get","head"],
    url: '/dashboard/student-enrollments/{studentClass}/{studentEnrollment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::studentByEnrollment
 * @see app/Http/Controllers/StudentEnrollmentController.php:114
 * @route '/dashboard/student-enrollments/{studentClass}/{studentEnrollment}'
 */
studentByEnrollment.url = (args: { studentClass: string | { slug: string }, studentEnrollment: string | { id: string } } | [studentClass: string | { slug: string }, studentEnrollment: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    studentClass: args[0],
                    studentEnrollment: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentClass: typeof args.studentClass === 'object'
                ? args.studentClass.slug
                : args.studentClass,
                                studentEnrollment: typeof args.studentEnrollment === 'object'
                ? args.studentEnrollment.id
                : args.studentEnrollment,
                }

    return studentByEnrollment.definition.url
            .replace('{studentClass}', parsedArgs.studentClass.toString())
            .replace('{studentEnrollment}', parsedArgs.studentEnrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentEnrollmentController::studentByEnrollment
 * @see app/Http/Controllers/StudentEnrollmentController.php:114
 * @route '/dashboard/student-enrollments/{studentClass}/{studentEnrollment}'
 */
studentByEnrollment.get = (args: { studentClass: string | { slug: string }, studentEnrollment: string | { id: string } } | [studentClass: string | { slug: string }, studentEnrollment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentByEnrollment.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentEnrollmentController::studentByEnrollment
 * @see app/Http/Controllers/StudentEnrollmentController.php:114
 * @route '/dashboard/student-enrollments/{studentClass}/{studentEnrollment}'
 */
studentByEnrollment.head = (args: { studentClass: string | { slug: string }, studentEnrollment: string | { id: string } } | [studentClass: string | { slug: string }, studentEnrollment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: studentByEnrollment.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::studentByEnrollment
 * @see app/Http/Controllers/StudentEnrollmentController.php:114
 * @route '/dashboard/student-enrollments/{studentClass}/{studentEnrollment}'
 */
    const studentByEnrollmentForm = (args: { studentClass: string | { slug: string }, studentEnrollment: string | { id: string } } | [studentClass: string | { slug: string }, studentEnrollment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: studentByEnrollment.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::studentByEnrollment
 * @see app/Http/Controllers/StudentEnrollmentController.php:114
 * @route '/dashboard/student-enrollments/{studentClass}/{studentEnrollment}'
 */
        studentByEnrollmentForm.get = (args: { studentClass: string | { slug: string }, studentEnrollment: string | { id: string } } | [studentClass: string | { slug: string }, studentEnrollment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: studentByEnrollment.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentEnrollmentController::studentByEnrollment
 * @see app/Http/Controllers/StudentEnrollmentController.php:114
 * @route '/dashboard/student-enrollments/{studentClass}/{studentEnrollment}'
 */
        studentByEnrollmentForm.head = (args: { studentClass: string | { slug: string }, studentEnrollment: string | { id: string } } | [studentClass: string | { slug: string }, studentEnrollment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: studentByEnrollment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    studentByEnrollment.form = studentByEnrollmentForm
const StudentEnrollmentController = { show, update, destroy, index, store, reports, studentByEnrollment }

export default StudentEnrollmentController