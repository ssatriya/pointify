import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
export const selectUnenrolled = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectUnenrolled.url(args, options),
    method: 'get',
})

selectUnenrolled.definition = {
    methods: ["get","head"],
    url: '/dashboard/students/select-unenrolled/{vocational_program}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
selectUnenrolled.url = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vocational_program: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    vocational_program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        vocational_program: args.vocational_program,
                }

    return selectUnenrolled.definition.url
            .replace('{vocational_program}', parsedArgs.vocational_program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
selectUnenrolled.get = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectUnenrolled.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
selectUnenrolled.head = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: selectUnenrolled.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
    const selectUnenrolledForm = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: selectUnenrolled.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
        selectUnenrolledForm.get = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: selectUnenrolled.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SearchUnenrolledStudentController::__invoke
 * @see app/Http/Controllers/SearchUnenrolledStudentController.php:22
 * @route '/dashboard/students/select-unenrolled/{vocational_program}'
 */
        selectUnenrolledForm.head = (args: { vocational_program: string | number } | [vocational_program: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: selectUnenrolled.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    selectUnenrolled.form = selectUnenrolledForm
/**
* @see \App\Http\Controllers\StudentImportController::downloadTemplate
 * @see app/Http/Controllers/StudentImportController.php:33
 * @route '/dashboard/students/download-template'
 */
export const downloadTemplate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(options),
    method: 'get',
})

downloadTemplate.definition = {
    methods: ["get","head"],
    url: '/dashboard/students/download-template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentImportController::downloadTemplate
 * @see app/Http/Controllers/StudentImportController.php:33
 * @route '/dashboard/students/download-template'
 */
downloadTemplate.url = (options?: RouteQueryOptions) => {
    return downloadTemplate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentImportController::downloadTemplate
 * @see app/Http/Controllers/StudentImportController.php:33
 * @route '/dashboard/students/download-template'
 */
downloadTemplate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentImportController::downloadTemplate
 * @see app/Http/Controllers/StudentImportController.php:33
 * @route '/dashboard/students/download-template'
 */
downloadTemplate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadTemplate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentImportController::downloadTemplate
 * @see app/Http/Controllers/StudentImportController.php:33
 * @route '/dashboard/students/download-template'
 */
    const downloadTemplateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadTemplate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentImportController::downloadTemplate
 * @see app/Http/Controllers/StudentImportController.php:33
 * @route '/dashboard/students/download-template'
 */
        downloadTemplateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentImportController::downloadTemplate
 * @see app/Http/Controllers/StudentImportController.php:33
 * @route '/dashboard/students/download-template'
 */
        downloadTemplateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadTemplate.form = downloadTemplateForm
/**
* @see \App\Http\Controllers\StudentImportController::importMethod
 * @see app/Http/Controllers/StudentImportController.php:22
 * @route '/dashboard/students/import'
 */
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/dashboard/students/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StudentImportController::importMethod
 * @see app/Http/Controllers/StudentImportController.php:22
 * @route '/dashboard/students/import'
 */
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentImportController::importMethod
 * @see app/Http/Controllers/StudentImportController.php:22
 * @route '/dashboard/students/import'
 */
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StudentImportController::importMethod
 * @see app/Http/Controllers/StudentImportController.php:22
 * @route '/dashboard/students/import'
 */
    const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentImportController::importMethod
 * @see app/Http/Controllers/StudentImportController.php:22
 * @route '/dashboard/students/import'
 */
        importMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:34
 * @route '/dashboard/students'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:34
 * @route '/dashboard/students'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:34
 * @route '/dashboard/students'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:34
 * @route '/dashboard/students'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:34
 * @route '/dashboard/students'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:34
 * @route '/dashboard/students'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:34
 * @route '/dashboard/students'
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
* @see \App\Http\Controllers\StudentController::store
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/dashboard/students'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/students',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StudentController::store
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/dashboard/students'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::store
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/dashboard/students'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StudentController::store
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/dashboard/students'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentController::store
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/dashboard/students'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:54
 * @route '/dashboard/students/{student}'
 */
export const show = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/students/{student}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:54
 * @route '/dashboard/students/{student}'
 */
show.url = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return show.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:54
 * @route '/dashboard/students/{student}'
 */
show.get = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:54
 * @route '/dashboard/students/{student}'
 */
show.head = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:54
 * @route '/dashboard/students/{student}'
 */
    const showForm = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:54
 * @route '/dashboard/students/{student}'
 */
        showForm.get = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:54
 * @route '/dashboard/students/{student}'
 */
        showForm.head = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\StudentController::update
 * @see app/Http/Controllers/StudentController.php:64
 * @route '/dashboard/students/{student}'
 */
export const update = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/students/{student}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\StudentController::update
 * @see app/Http/Controllers/StudentController.php:64
 * @route '/dashboard/students/{student}'
 */
update.url = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return update.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::update
 * @see app/Http/Controllers/StudentController.php:64
 * @route '/dashboard/students/{student}'
 */
update.put = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\StudentController::update
 * @see app/Http/Controllers/StudentController.php:64
 * @route '/dashboard/students/{student}'
 */
    const updateForm = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentController::update
 * @see app/Http/Controllers/StudentController.php:64
 * @route '/dashboard/students/{student}'
 */
        updateForm.put = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\StudentController::destroy
 * @see app/Http/Controllers/StudentController.php:75
 * @route '/dashboard/students/{student}'
 */
export const destroy = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/students/{student}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StudentController::destroy
 * @see app/Http/Controllers/StudentController.php:75
 * @route '/dashboard/students/{student}'
 */
destroy.url = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return destroy.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::destroy
 * @see app/Http/Controllers/StudentController.php:75
 * @route '/dashboard/students/{student}'
 */
destroy.delete = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\StudentController::destroy
 * @see app/Http/Controllers/StudentController.php:75
 * @route '/dashboard/students/{student}'
 */
    const destroyForm = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentController::destroy
 * @see app/Http/Controllers/StudentController.php:75
 * @route '/dashboard/students/{student}'
 */
        destroyForm.delete = (args: { student: string | { id: string } } | [student: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const students = {
    selectUnenrolled: Object.assign(selectUnenrolled, selectUnenrolled),
downloadTemplate: Object.assign(downloadTemplate, downloadTemplate),
import: Object.assign(importMethod, importMethod),
index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default students