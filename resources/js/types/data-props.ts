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