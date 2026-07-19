<?php

namespace App\Models;

use App\Enums\TransactionType;
use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StudentEnrollment extends Model
{
    use HasFactory, HasUlids, Searchable, Sortable;

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
     *
     * @return BelongsTo<Student, $this>
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the studentClass that owns the StudentEnrollment
     *
     * @return BelongsTo<StudentClass, $this>
     */
    public function studentClass(): BelongsTo
    {
        return $this->belongsTo(StudentClass::class);
    }

    /**
     * Get the academicYear that owns the StudentEnrollment
     *
     * @return BelongsTo<AcademicYear, $this>
     */
    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    /**
     * Get all the violations for the StudentEnrollment
     *
     * @return HasMany<Violation, $this>
     */
    public function violations(): HasMany
    {
        return $this->hasMany(Violation::class);
    }

    /**
     * Get all the rewards for the StudentEnrollment
     *
     * @return HasMany<Reward, $this>
     */
    public function rewards(): HasMany
    {
        return $this->hasMany(Reward::class);
    }

    /**
     * Get all the pointTransactions for the StudentEnrollment
     *
     * @return HasMany<PointTransaction, $this>
     */
    public function pointTransactions(): HasMany
    {
        return $this->hasMany(PointTransaction::class);
    }

    /**
     * Get all the pointTransactionGroups for the StudentEnrollment
     *
     * @return HasMany<PointTransactionGroup, $this>
     */
    public function pointTransactionGroups(): HasMany
    {
        return $this->hasMany(PointTransactionGroup::class);
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
     * Falls back to a DB sum query when the collection isn't loaded.
     */
    public function getCurrentPointsAttribute(): int
    {
        if ($this->relationLoaded('pointTransactions')) {
            return $this->initial_points + $this->pointTransactions->sum('points_change');
        }

        return $this->initial_points + (int) $this->pointTransactions()->sum('points_change');
    }

    /**
     * Get the student total violations points for this enrollment.
     * Do not return the count, but rather the sum of violation points.
     * Falls back to a DB sum query when the collection isn't loaded.
     */
    public function getTotalViolationsPointsAttribute(): int
    {
        if ($this->relationLoaded('pointTransactions')) {
            return $this->pointTransactions
                ->filter(fn ($t) => $t->transaction_type === TransactionType::VIOLATION->value
                    || ($t->transaction_type === TransactionType::REVOKED->value && $t->violation_id !== null))
                ->sum('points_change');
        }

        return (int) $this->pointTransactions()
            ->whereIn('transaction_type', [TransactionType::VIOLATION->value])
            ->orWhere(fn ($q) => $q
                ->where('transaction_type', TransactionType::REVOKED->value)
                ->whereNotNull('violation_id'),
            )
            ->sum('points_change');
    }

    /**
     * Get the student total rewards points for this enrollment.
     * Do not return the count, but rather the sum of reward points.
     * Falls back to a DB sum query when the collection isn't loaded.
     */
    public function getTotalRewardsPointsAttribute(): int
    {
        if ($this->relationLoaded('pointTransactions')) {
            return $this->pointTransactions
                ->filter(fn ($t) => $t->transaction_type === TransactionType::REWARD->value
                    || ($t->transaction_type === TransactionType::REVOKED->value && $t->reward_id !== null))
                ->sum('points_change');
        }

        return (int) $this->pointTransactions()
            ->whereIn('transaction_type', [TransactionType::REWARD->value])
            ->orWhere(fn ($q) => $q
                ->where('transaction_type', TransactionType::REVOKED->value)
                ->whereNotNull('reward_id'),
            )
            ->sum('points_change');
    }

    public function getResetCountAttribute(): int
    {
        if ($this->relationLoaded('pointTransactions')) {
            return $this->pointTransactions->where('transaction_type', 'reset')->count();
        }

        return (int) $this->pointTransactions()->where('transaction_type', 'reset')->count();
    }

    public function getRecentViolationsAttribute(): Collection
    {
        return $this->pointTransactions()
            ->with('violation.violationType')
            ->where('transaction_type', 'violation')
            ->latest()
            ->take(5)
            ->get();
    }
}
