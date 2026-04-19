<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Warning Letter</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            /* DomPDF safe font */
            font-size: 12px;
            line-height: 1.5;
            margin: 40px;
        }

        .letter-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .letter-header h1 {
            font-size: 18px;
            margin: 0;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .info-table td {
            padding: 5px;
            vertical-align: top;
        }

        .info-table td.label {
            width: 120px;
            font-weight: bold;
        }

        .content-box {
            border: 1px solid #000;
            padding: 12px;
            margin-bottom: 20px;
        }

        .violations {
            margin-top: 10px;
        }

        .violations ul {
            margin: 0;
            padding-left: 20px;
        }

        .signature {
            margin-top: 40px;
            text-align: right;
        }
    </style>
</head>

<body>
    <div class="letter-header">
        <h1>Warning Letter</h1>
        <p>Academic Year: {{ $student['student']['academic_year'] }}</p>
    </div>

    <table class="info-table">
        <tr>
            <td class="label">Name</td>
            <td>{{ $student['student']['name'] }}</td>
        </tr>
        <tr>
            <td class="label">NIS</td>
            <td>{{ $student['student']['student_number'] }}</td>
        </tr>
        <tr>
            <td class="label">Class</td>
            <td>{{ $student['student']['student_class'] }}</td>
        </tr>
    </table>

    <div class="content-box">
        <p>
            This letter serves as an official warning regarding the following violations:
        </p>
        {{ $violations }}
        <div class="violations">
            <ul>
                {{-- @foreach ($violation['violations'] as $violation)
                <li>{{ $violation->violationType->name }}</li>
                @endforeach --}}
            </ul>
        </div>
    </div>

    <div class="signature">
        <p>_________________________</p>
        <p>Headmaster</p>
    </div>
</body>

</html>