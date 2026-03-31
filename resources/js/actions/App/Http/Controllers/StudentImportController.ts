import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
const StudentImportController = { downloadTemplate, importMethod, import: importMethod }

export default StudentImportController