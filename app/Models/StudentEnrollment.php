<?php

namespace App\Models;

use App\Enums\TransactionType;
use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StudentEnrollment extends Model
{
    use HasUlids, Sortable, Searchable;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'student_id',
        'student_class_id',
        'academic_year_id',
        'initial_points',
        'is_repeating',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_repeating' => 'boolean',
        'initial_points' => 'integer',
    ];
    protected array $searchable = [
        'student.name',
    ];
    protected array $sortable = [
        'created_at',
        'student.name',
    ];

    /**
     * Get the student that owns the StudentEnrollment
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the studentClass that owns the StudentEnrollment
     */
    public function studentClass(): BelongsTo
    {
        return $this->belongsTo(StudentClass::class);
    }

    /**
     * Get the academicYear that owns the StudentEnrollment
     */
    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    /**
     * Get all the violations for the StudentEnrollment
     */
    public function violations(): HasMany
    {
        return $this->hasMany(Violation::class);
    }

    /**
     * Get all the rewards for the StudentEnrollment
     */
    public function rewards(): HasMany
    {
        return $this->hasMany(Reward::class);
    }

    /**
     * Get all the pointTransactions for the StudentEnrollment
     */
    public function pointTransactions(): HasMany
    {
        return $this->hasMany(PointTransaction::class);
    }

    /**
     * Get the student's name for this enrollment
     */
    public function getNameAttribute(): ?string
    {
        return $this->student?->name;
    }

    /**
     * Get the student current points for this enrollment.
     * Using + operator since points_change can be negative (deductions).
     * @return int
     */
    public function getCurrentPointsAttribute(): int
    {
        return $this->initial_points + $this->pointTransactions->sum('points_change');
    }

    /**
     * Get the student total violations points for this enrollment.
     * Do not return the count, but rather the sum of violation points.
     * @return int
     */
    public function getTotalViolationsPointsAttribute(): int
    {
        return $this->pointTransactions->where('transaction_type', TransactionType::VIOLATION->value)->sum('points_change');
    }

    /**
     * Get the student total rewards points for this enrollment.
     * Do not return the count, but rather the sum of reward points.
     * @return int
     */
    public function getTotalRewardsPointsAttribute(): int
    {
        return $this->pointTransactions->where('transaction_type', TransactionType::REWARD->value)->sum('points_change');
    }

    public function getResetCountAttribute(): int
    {
        return $this->pointTransactions->where('transaction_type', 'reset')->sum('points_change');
    }

    public function getRecentViolationsAttribute(): Collection
    {
        return $this->pointTransactions()
            ->with('violationType')
            ->where('transaction_type', 'violation')
            ->latest()
            ->take(5)
            ->get();
    }
}
