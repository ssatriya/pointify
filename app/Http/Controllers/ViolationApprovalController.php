<?php

namespace App\Http\Controllers;

use App\Facades\DataTable;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\ViolationApprovalRequest;
use App\Http\Resources\ViolationResource;
use App\Http\Services\ViolationApprovalService;
use App\Models\Violation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViolationApprovalController extends Controller
{
    public function __construct(protected ViolationApprovalService $violationApprovalSerice)
    {
    }

    public function index(GetListRequestParams $request)
    {
        $validated = $request->validated();

        $query = Violation::with([
            'studentEnrollment',
            'studentEnrollment.student',
            'studentEnrollment.studentClass',
            'violationType',
            'createdBy',
        ]);

        $paginatedList = DataTable::make($query, $validated)->process();

        return Inertia::render('ViolationApproval/Index', [
            'violations' => ViolationResource::collection($paginatedList),
        ]);
    }

    public function update(Violation $violation, ViolationApprovalRequest $request)
    {
        $this->violationApprovalSerice->update($request->validated(), $violation);

        return Inertia::flash(['message' => 'Status persetujuan pelanggaran berhasil diperbarui.'])->back();
    }
}
