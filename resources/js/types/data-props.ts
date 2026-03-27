export type OptionType = {
    label: string | number | boolean;
    value: string | number | boolean;
};

export type AcademicYear = {
    id: string,
    name: string,
    start_date: string,
    start_date_raw: string,
    end_date: string,
    end_date_raw: string,
    is_active: boolean,
    created_at: string
}

export type VocationalProgram = {
    id: string
    name: string
    abbreviation?: string
    created_at: string
}

export type Class = {
    id: string
    name: string
    grade_level: OptionType
    section: OptionType
    vocational_program: OptionType
    created_at: string
}

export type Student = {
    id: string
    name: string
    student_number: string
    vocational_program: OptionType
    is_active: boolean
    created_at: string
}

export type PointThreshold = {
    id: string
    cumulative_points_threshold: number
    academic_year: OptionType
    description?: string
    is_active: boolean
    created_at: string
}

export type ViolationType = {
    id: string
    code: string
    description: string
    points: number
    is_active: boolean
    created_at: string
}

export type RewardType = {
    id: string
    code: string
    description: string
    points: number
    is_active: boolean
    created_at: string
}