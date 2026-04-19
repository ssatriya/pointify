import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ViolationLetterController::__invoke
 * @see app/Http/Controllers/ViolationLetterController.php:11
 * @route '/dashboard/student-enrollments/{studentEnrollment}/sequence/{sequence}'
 */
const ViolationLetterController = (args: { studentEnrollment: string | { id: string }, sequence: string | number } | [studentEnrollment: string | { id: string }, sequence: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViolationLetterController.url(args, options),
    method: 'get',
})

ViolationLetterController.definition = {
    methods: ["get","head"],
    url: '/dashboard/student-enrollments/{studentEnrollment}/sequence/{sequence}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ViolationLetterController::__invoke
 * @see app/Http/Controllers/ViolationLetterController.php:11
 * @route '/dashboard/student-enrollments/{studentEnrollment}/sequence/{sequence}'
 */
ViolationLetterController.url = (args: { studentEnrollment: string | { id: string }, sequence: string | number } | [studentEnrollment: string | { id: string }, sequence: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    studentEnrollment: args[0],
                    sequence: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentEnrollment: typeof args.studentEnrollment === 'object'
                ? args.studentEnrollment.id
                : args.studentEnrollment,
                                sequence: args.sequence,
                }

    return ViolationLetterController.definition.url
            .replace('{studentEnrollment}', parsedArgs.studentEnrollment.toString())
            .replace('{sequence}', parsedArgs.sequence.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ViolationLetterController::__invoke
 * @see app/Http/Controllers/ViolationLetterController.php:11
 * @route '/dashboard/student-enrollments/{studentEnrollment}/sequence/{sequence}'
 */
ViolationLetterController.get = (args: { studentEnrollment: string | { id: string }, sequence: string | number } | [studentEnrollment: string | { id: string }, sequence: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViolationLetterController.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ViolationLetterController::__invoke
 * @see app/Http/Controllers/ViolationLetterController.php:11
 * @route '/dashboard/student-enrollments/{studentEnrollment}/sequence/{sequence}'
 */
ViolationLetterController.head = (args: { studentEnrollment: string | { id: string }, sequence: string | number } | [studentEnrollment: string | { id: string }, sequence: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViolationLetterController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ViolationLetterController::__invoke
 * @see app/Http/Controllers/ViolationLetterController.php:11
 * @route '/dashboard/student-enrollments/{studentEnrollment}/sequence/{sequence}'
 */
    const ViolationLetterControllerForm = (args: { studentEnrollment: string | { id: string }, sequence: string | number } | [studentEnrollment: string | { id: string }, sequence: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViolationLetterController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ViolationLetterController::__invoke
 * @see app/Http/Controllers/ViolationLetterController.php:11
 * @route '/dashboard/student-enrollments/{studentEnrollment}/sequence/{sequence}'
 */
        ViolationLetterControllerForm.get = (args: { studentEnrollment: string | { id: string }, sequence: string | number } | [studentEnrollment: string | { id: string }, sequence: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViolationLetterController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ViolationLetterController::__invoke
 * @see app/Http/Controllers/ViolationLetterController.php:11
 * @route '/dashboard/student-enrollments/{studentEnrollment}/sequence/{sequence}'
 */
        ViolationLetterControllerForm.head = (args: { studentEnrollment: string | { id: string }, sequence: string | number } | [studentEnrollment: string | { id: string }, sequence: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViolationLetterController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViolationLetterController.form = ViolationLetterControllerForm
export default ViolationLetterController