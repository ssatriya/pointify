import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:26
 * @route '/dashboard/{studentClass}'
 */
export const index = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/{studentClass}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:26
 * @route '/dashboard/{studentClass}'
 */
index.url = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:26
 * @route '/dashboard/{studentClass}'
 */
index.get = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:26
 * @route '/dashboard/{studentClass}'
 */
index.head = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:26
 * @route '/dashboard/{studentClass}'
 */
    const indexForm = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:26
 * @route '/dashboard/{studentClass}'
 */
        indexForm.get = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentEnrollmentController::index
 * @see app/Http/Controllers/StudentEnrollmentController.php:26
 * @route '/dashboard/{studentClass}'
 */
        indexForm.head = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:71
 * @route '/dashboard/{studentClass}'
 */
export const store = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/{studentClass}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::store
 * @see app/Http/Controllers/StudentEnrollmentController.php:71
 * @route '/dashboard/{studentClass}'
 */
store.url = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:71
 * @route '/dashboard/{studentClass}'
 */
store.post = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::store
 * @see app/Http/Controllers/StudentEnrollmentController.php:71
 * @route '/dashboard/{studentClass}'
 */
    const storeForm = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::store
 * @see app/Http/Controllers/StudentEnrollmentController.php:71
 * @route '/dashboard/{studentClass}'
 */
        storeForm.post = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:58
 * @route '/dashboard/{studentClass}/reports'
 */
export const reports = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(args, options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/dashboard/{studentClass}/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:58
 * @route '/dashboard/{studentClass}/reports'
 */
reports.url = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:58
 * @route '/dashboard/{studentClass}/reports'
 */
reports.get = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:58
 * @route '/dashboard/{studentClass}/reports'
 */
reports.head = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:58
 * @route '/dashboard/{studentClass}/reports'
 */
    const reportsForm = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:58
 * @route '/dashboard/{studentClass}/reports'
 */
        reportsForm.get = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentEnrollmentController::reports
 * @see app/Http/Controllers/StudentEnrollmentController.php:58
 * @route '/dashboard/{studentClass}/reports'
 */
        reportsForm.head = (args: { studentClass: string | number | { slug: string | number } } | [studentClass: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\StudentEnrollmentController::studentDetail
 * @see app/Http/Controllers/StudentEnrollmentController.php:115
 * @route '/dashboard/{studentClass}/{studentEnrollment}'
 */
export const studentDetail = (args: { studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } } | [studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentDetail.url(args, options),
    method: 'get',
})

studentDetail.definition = {
    methods: ["get","head"],
    url: '/dashboard/{studentClass}/{studentEnrollment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::studentDetail
 * @see app/Http/Controllers/StudentEnrollmentController.php:115
 * @route '/dashboard/{studentClass}/{studentEnrollment}'
 */
studentDetail.url = (args: { studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } } | [studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return studentDetail.definition.url
            .replace('{studentClass}', parsedArgs.studentClass.toString())
            .replace('{studentEnrollment}', parsedArgs.studentEnrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentEnrollmentController::studentDetail
 * @see app/Http/Controllers/StudentEnrollmentController.php:115
 * @route '/dashboard/{studentClass}/{studentEnrollment}'
 */
studentDetail.get = (args: { studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } } | [studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentDetail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentEnrollmentController::studentDetail
 * @see app/Http/Controllers/StudentEnrollmentController.php:115
 * @route '/dashboard/{studentClass}/{studentEnrollment}'
 */
studentDetail.head = (args: { studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } } | [studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: studentDetail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::studentDetail
 * @see app/Http/Controllers/StudentEnrollmentController.php:115
 * @route '/dashboard/{studentClass}/{studentEnrollment}'
 */
    const studentDetailForm = (args: { studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } } | [studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: studentDetail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::studentDetail
 * @see app/Http/Controllers/StudentEnrollmentController.php:115
 * @route '/dashboard/{studentClass}/{studentEnrollment}'
 */
        studentDetailForm.get = (args: { studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } } | [studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: studentDetail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentEnrollmentController::studentDetail
 * @see app/Http/Controllers/StudentEnrollmentController.php:115
 * @route '/dashboard/{studentClass}/{studentEnrollment}'
 */
        studentDetailForm.head = (args: { studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } } | [studentClass: string | number | { slug: string | number }, studentEnrollment: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: studentDetail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    studentDetail.form = studentDetailForm
const classMethod = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
reports: Object.assign(reports, reports),
studentDetail: Object.assign(studentDetail, studentDetail),
}

export default classMethod