<?php

namespace App\Http\Controllers;

use App\Facades\DataTable;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\ViolationApprovalRequest;
use App\Http\Resources\ViolationResource;
use App\Http\Services\ViolationApprovalService;
use App\Models\Violation;
use Inertia\Inertia;

class ViolationApprovalController extends Controller
{
    public function __construct(protected ViolationApprovalService $violationApprovalService)
    {
    }

    public function index(GetListRequestParams $request)
    {
        $validated = $request->validated();

        $query = Violation::with([
            'studentEnrollment',
            'studentEnrollment.student',
            'studentEnrollment.studentClass',
            'studentEnrollment.studentClass.vocationalProgram',
            'violationType',
            'createdBy',
        ]);

        $paginatedList = DataTable::make($query, $validated)->process();

        return Inertia::render('dashboard/violation-approvals/violation-approvals', [
            'violations' => ViolationResource::collection($paginatedList),
        ]);
    }

    public function update(Violation $violation, ViolationApprovalRequest $request)
    {
        $this->violationApprovalService->update($request->validated(), $violation);

        return Inertia::flash(['message' => 'Status persetujuan pelanggaran berhasil diperbarui.'])->back();
    }

    public function show(Violation $violation)
    {
        $violation->load([
            'studentEnrollment',
            'studentEnrollment.student',
            'studentEnrollment.studentClass',
            'studentEnrollment.studentClass.vocationalProgram',
            'violationType',
            'createdBy',
        ]);

        return Inertia::render('dashboard/violation-approvals/partials/update-violation-approval', [
            'violation' => new ViolationResource($violation),
        ]);
    }
}
