import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/dashboard/student-enrollments/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SearchStudentEnrollmentController::__invoke
 * @see app/Http/Controllers/SearchStudentEnrollmentController.php:22
 * @route '/dashboard/student-enrollments/search'
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
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:83
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
export const show = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/student-enrollments/{studentEnrollment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:83
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
show.url = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:83
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
show.get = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:83
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
show.head = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:83
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
    const showForm = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:83
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
        showForm.get = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentEnrollmentController::show
 * @see app/Http/Controllers/StudentEnrollmentController.php:83
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
        showForm.head = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:94
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
export const update = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/student-enrollments/{studentEnrollment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::update
 * @see app/Http/Controllers/StudentEnrollmentController.php:94
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
update.url = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:94
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
update.put = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::update
 * @see app/Http/Controllers/StudentEnrollmentController.php:94
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
    const updateForm = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:94
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
        updateForm.put = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:104
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
export const destroy = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/student-enrollments/{studentEnrollment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StudentEnrollmentController::destroy
 * @see app/Http/Controllers/StudentEnrollmentController.php:104
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
destroy.url = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:104
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
destroy.delete = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\StudentEnrollmentController::destroy
 * @see app/Http/Controllers/StudentEnrollmentController.php:104
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
    const destroyForm = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/StudentEnrollmentController.php:104
 * @route '/dashboard/student-enrollments/{studentEnrollment}'
 */
        destroyForm.delete = (args: { studentEnrollment: string | number | { id: string | number } } | [studentEnrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const studentEnrollments = {
    search: Object.assign(search, search),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default studentEnrollments