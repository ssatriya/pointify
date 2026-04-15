<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surat Peringatan Siswa</title>
    <style>
        @page {
            /* margin: 2cm; */
            size: A4;
        }

        body {
            font-family: 'Times New Roman', serif;
            font-size: 10pt;
            line-height: 1.1;
            color: #000;
            margin: 0;
            padding: 0;
        }

        .letterhead {
            text-align: center;
        }

        .logo-container {
            display: table;
            width: 100%;
            margin-bottom: 10px;
        }

        .logo-left,
        .logo-right {
            display: table-cell;
            width: 80px;
            vertical-align: middle;
        }

        .logo-center {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }

        .logo-placeholder {
            width: 60px;
            height: 60px;
            border: 2px solid #333;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            margin: 0 auto;
        }

        .school-name {
            font-weight: bold;
            font-size: 14pt;
            margin: 5px 0;
        }

        .school-type {
            font-weight: bold;
            font-size: 16pt;
            margin: 5px 0;
        }

        .accreditation {
            font-weight: bold;
            font-size: 12pt;
            margin: 3px 0;
        }

        .school-details {
            font-size: 10pt;
            margin: 2px 0;
        }

        .letter-number {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            margin: 16px 0;
            text-decoration: underline;
        }

        .letter-ref {
            text-align: left;
            font-size: 11pt;
            margin-bottom: 25px;
        }

        .recipient {
            margin-bottom: 20px;
        }

        .recipient-line {
            margin: 3px 0;
        }

        .content {
            text-align: justify;
            margin: 10px 0;
            line-height: 1.4;
        }

        .details-table {
            margin: 15px 0;
            margin-left: 16px;
        }

        .details-row {
            margin: 5px 0;
        }

        .details-label {
            display: inline-block;
            width: 160px;
            vertical-align: top;
        }

        .details-separator {
            display: inline-block;
            width: 15px;
            text-align: center;
        }

        .details-value {
            display: inline-block;
        }

        .closing {
            margin-top: 30px;
        }

        .signature-section {
            float: right;
            text-align: center;
            width: 250px;
            margin-top: 20px;
        }

        .signature-date {
            margin-bottom: 4px;
        }

        .signature-title {
            margin-bottom: 60px;
        }

        .signature-name {
            font-weight: bold;
            text-decoration: underline;
        }

        .violations-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 11pt;
        }

        .violations-table th,
        .violations-table td {
            border: 1px solid #000;
            padding: 8px 5px;
            text-align: left;
            vertical-align: top;
        }

        .violations-table th {
            background-color: #f0f0f0;
            font-weight: bold;
            text-align: center;
        }

        .violations-table .number-col {
            width: 8%;
            text-align: center;
        }

        .violations-table .date-col {
            width: 15%;
            text-align: center;
        }

        .violations-table .violation-col {
            width: 35%;
        }

        .violations-table .notes-col {
            width: 27%;
        }

        .violations-table .points-col {
            width: 15%;
            text-align: center;
        }

        .page-break {
            page-break-before: always;
        }

        .attachment-header {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            margin: 20px 0 30px 0;
            text-decoration: underline;
        }

        .attachment-info {
            margin-bottom: 20px;
        }

        .attachment-student-info {
            margin-bottom: 15px;
            font-weight: bold;
        }

        .total-summary {
            margin-top: 15px;
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
        }

        .total-row {
            font-weight: bold;
            background-color: #e9ecef;
        }

        .warning-level {
            font-weight: bold;
            color: #d63031;
        }

        .points-info {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
        }

        p {
            text-indent: 2rem;
        }

        .kop-img {
            object-fit: cover;
            width: 700px;
            height: auto;
        }
    </style>
</head>

<body>
    <div class="letterhead">
        <img src="kop-surat.png" />
        {{-- <img src="test-kop-surat.png" class="kop-img" /> --}}
    </div>

    <div class="letter-number">
        SURAT PERINGATAN
    </div>

    <div class="letter-ref">
        Nomor :
    </div>

    <div class="recipient">
        <div class="recipient-line">Kepada Yth,</div>
        <div class="recipient-line">Bapak/Ibu Orang Tua/Wali Siswa</div>
        {{-- <div class="recipient-line"><strong>{{ $letter->studentEnrollment->student->name }}</strong></div> --}}
        {{-- <div class="recipient-line">Kelas <strong>{{ $letter->studentEnrollment->studentClass->name }}</strong>
        </div> --}}
        <div class="recipient-line">Di</div>
        <div class="recipient-line" style="margin-left: 40px;"><strong>Tempat</strong></div>
    </div>

    <div class="content">
        Dengan hormat,
    </div>

    <div class="content">
        <p>
            Berdasarkan catatan pelanggaran tata tertib sekolah, dengan ini kami sampaikan bahwa putra/putri
            Bapak/Ibu telah mencapai batas poin yang mengharuskan kami memberikan
            surat peringatan dengan data sebagai berikut:
        </p>
    </div>

    <div class="details-table">
        <div class="details-row">
            <span class="details-label">Nama Siswa</span>
            <span class="details-separator">:</span>
            <span class="details-value"><strong>{{ $letter->studentEnrollment->student->name }}</strong></span>
        </div>
        <div class="details-row">
            <span class="details-label">Nomor Induk Siswa</span>
            <span class="details-separator">:</span>
            <span
                class="details-value"><strong>{{ $letter->studentEnrollment->student->student_number }}</strong></span>
        </div>
        <div class="details-row">
            <span class="details-label">Kelas</span>
            <span class="details-separator">:</span>
            <span class="details-value"><strong>{{ $letter->studentEnrollment->studentClass->name }}</strong></span>
        </div>
        <div class="details-row">
            <span class="details-label">Sisa Poin Kedisiplinan</span>
            <span class="details-separator">:</span>
            {{-- <span class="details-value"><strong>{{ $letter->current_remaining_points }} dari 100
                    poin</strong></span> --}}
            <span class="details-value"><strong>{{ $letter->transactionGroup->violations->sum(function ($violation) {
    return $violation->pointTransaction->intended_points ?? 0;
}) }} dari 100 poin</strong></span>
        </div>
        <div class="details-row">
            <span class="details-label">Total Pelanggaran</span>
            <span class="details-separator">:</span>
            <span class="details-value"><strong>{{ count($letter->transactionGroup->violations) }} kasus</strong></span>
        </div>
    </div>

    <div class="content">
        Adapun rincian pelanggaran yang telah dilakukan sebagaimana tercantum dalam lampiran yang menyertai surat ini.
    </div>

    <div class="content">
        <p>
            Mengingat pentingnya pembentukan karakter dan kedisiplinan siswa, kami sangat mengharapkan
            kerja sama Bapak/Ibu untuk memberikan bimbingan dan pengawasan yang lebih intensif kepada
            putra/putri Bapak/Ibu. Apabila poin kedisiplinan siswa mencapai batas minimum yang telah ditetapkan,
            maka pihak sekolah akan mengambil tindakan lebih lanjut sesuai dengan peraturan tata tertib yang berlaku.
        </p>
    </div>

    <div class="content">
        Demikian surat peringatan ini kami sampaikan. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima
        kasih.
    </div>

    <div class="clearfix">
        <div class="signature-section">
            <div class="signature-date">Batola,
                {{ \Carbon\Carbon::now()->locale('id')->translatedFormat('j F Y') }}
            </div>
            <div class="signature-title">Kepala Sekolah,</div>
            <div class="signature-name">Dra. Yuliana Prabawati, M.Pd.</div>
            <div>NIP. 19690615 199303 2 006</div>
        </div>
    </div>

    <!-- LAMPIRAN -->
    <div class="page-break">
        <div class="attachment-header">
            LAMPIRAN<br>
            DAFTAR PELANGGARAN SISWA
        </div>

        <div class="attachment-info">
            <div class="attachment-student-info">
                Nama Siswa: {{ $letter->studentEnrollment->student->name }}<br>
                NIS: {{ $letter->studentEnrollment->student->student_number }}<br>
                Kelas: {{ $letter->studentEnrollment->studentClass->name }}<br>
                Periode: {{ $letter->studentEnrollment->academicYear->name }}
            </div>
        </div>

        {{-- <table class="violations-table">
            <thead>
                <tr>
                    <th class="number-col">No.</th>
                    <th class="date-col">Tanggal</th>
                    <th class="violation-col">Jenis Pelanggaran</th>
                    <th class="notes-col">Catatan Pelanggaran</th>
                    <th class="points-col">Poin Dipotong</th>
                </tr>
            </thead>
            <tbody>
                <!-- Example data - replace with dynamic content -->
                <tr>
                    <td class="number-col">1.</td>
                    <td class="date-col">[TANGGAL_1]</td>
                    <td class="violation-col">[JENIS_PELANGGARAN_1]</td>
                    <td class="notes-col">[CATATAN_PELANGGARAN_1]</td>
                    <td class="points-col">[POIN_1]</td>
                </tr>
                <tr>
                    <td class="number-col">2.</td>
                    <td class="date-col">[TANGGAL_2]</td>
                    <td class="violation-col">[JENIS_PELANGGARAN_2]</td>
                    <td class="notes-col">[CATATAN_PELANGGARAN_2]</td>
                    <td class="points-col">[POIN_2]</td>
                </tr>
                <tr>
                    <td class="number-col">3.</td>
                    <td class="date-col">[TANGGAL_3]</td>
                    <td class="violation-col">[JENIS_PELANGGARAN_3]</td>
                    <td class="notes-col">[CATATAN_PELANGGARAN_3]</td>
                    <td class="points-col">[POIN_3]</td>
                </tr>
                <!-- Add more rows as needed -->
                <tr class="total-row">
                    <td colspan="4" style="text-align: right; font-weight: bold;">Total Poin Terpotong:</td>
                    <td class="points-col" style="font-weight: bold;">[TOTAL_POIN]</td>
                </tr>
            </tbody>
        </table> --}}

        <table class="violations-table">
            <thead>
                <tr>
                    <th class="number-col">No.</th>
                    <th class="date-col">Tanggal</th>
                    <th class="violation-col">Jenis Pelanggaran</th>
                    <th class="notes-col">Catatan Pelanggaran</th>
                    <th class="points-col">Poin Dipotong</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($letter->transactionGroup->violations as $index => $violation)
                    <tr>
                        <td class="number-col">{{ $index + 1 }}.</td>
                        <td class="date-col">{{ \Carbon\Carbon::parse($violation->created_at)->format('d/m/Y') }}</td>
                        <td class="violation-col">{{ $violation->violationType->description ?? 'N/A' }}</td>
                        <td class="notes-col">{{ $violation->notes ?? '-' }}</td>
                        <td class="points-col">{{ $violation->pointTransaction->intended_points ?? 0 }}</td>
                    </tr>
                @endforeach

                <!-- Total row -->
                <tr class="total-row">
                    <td colspan="4" style="text-align: right; font-weight: bold;">Total Poin Terpotong:</td>
                    <td class="points-col" style="font-weight: bold;">
                        {{ $letter->transactionGroup->violations->sum(function ($violation) {
    return $violation->pointTransaction->intended_points ?? 0;
}) }}
                    </td>
                </tr>
            </tbody>
        </table>

        {{-- <div class="total-summary">
            <strong>Ringkasan Poin Kedisiplinan:</strong><br>
            • Poin Awal: 100 poin<br>
            • Total Poin Terpotong: [TOTAL_POIN] poin<br>
            • Sisa Poin Kedisiplinan: [SISA_POIN] poin<br>
            • Status: <span class="warning-level">[STATUS_KEDISIPLINAN]</span>
        </div> --}}

        <div class="content" style="margin-top: 20px;">
            <strong>Catatan:</strong><br>
            Daftar pelanggaran di atas merupakan catatan resmi dari bagian kesiswaan sekolah.
            Orang tua/wali siswa dapat menghubungi bagian kesiswaan untuk mendapatkan penjelasan
            lebih detail mengenai setiap pelanggaran yang tercatat.
        </div>
    </div>
</body>

</html>