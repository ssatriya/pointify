<?php

namespace App\Enums;

enum ErrorMessage: string
{
    // Permission Errors - Specific Actions
    case UNAUTHORIZED_DELETE = 'Anda tidak memiliki izin untuk menghapus data ini.';
    case UNAUTHORIZED_UPDATE = 'Anda tidak memiliki izin untuk mengubah data ini.';
    case UNAUTHORIZED_VIEW = 'Anda tidak memiliki izin untuk melihat data ini.';
    case UNAUTHORIZED_CREATE = 'Anda tidak memiliki izin untuk membuat data baru.';
    case CONFLICT_DELETE = 'Data ini tidak dapat dihapus karena memiliki relasi dengan data lain.';

    // General Permission
    case ACCESS_DENIED = 'Akses ditolak.';
    case INSUFFICIENT_PERMISSIONS = 'Izin Anda tidak mencukupi untuk melakukan tindakan ini.';
    case UNAUTHORIZED_RESOURCE = 'Anda tidak memiliki otorisasi untuk mengakses resource ini.';
    case FORBIDDEN_ACCESS = 'Permintaan ditolak. Anda tidak diizinkan mengakses halaman ini.';

    // Authentication
    case UNAUTHENTICATED = 'Silakan login terlebih dahulu untuk melanjutkan.';
    case SESSION_EXPIRED = 'Sesi Anda telah berakhir. Silakan login kembali.';
    case INVALID_CREDENTIALS = 'Email atau password yang Anda masukkan salah.';
    case TOKEN_INVALID = 'Token autentikasi tidak valid.';
    case TOKEN_EXPIRED = 'Token autentikasi telah kedaluwarsa.';

    // Success Messages
    case DELETE_SUCCESS = 'Data berhasil dihapus.';
    case UPDATE_SUCCESS = 'Data berhasil diperbarui.';
    case CREATE_SUCCESS = 'Data berhasil disimpan.';

    // Not Found
    case DATA_NOT_FOUND = 'Data yang Anda cari tidak ditemukan.';
    case RESOURCE_NOT_FOUND = 'Resource tidak ditemukan.';
    case PAGE_NOT_FOUND = 'Halaman tidak ditemukan.';

    // Validation Errors
    case VALIDATION_FAILED = 'Data yang Anda masukkan tidak valid.';
    case REQUIRED_FIELD_MISSING = 'Kolom ini wajib diisi.';
    case INVALID_FORMAT = 'Format data tidak sesuai.';

    // Server Errors
    case INTERNAL_SERVER_ERROR = 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
    case NETWORK_ERROR = 'Terjadi kesalahan koneksi. Periksa koneksi internet Anda.';
    case SERVICE_UNAVAILABLE = 'Layanan sedang tidak tersedia. Silakan coba beberapa saat lagi.';
    case DATABASE_ERROR = 'Terjadi kesalahan saat mengakses database.';

    // Rate Limiting
    case TOO_MANY_REQUESTS = 'Terlalu banyak permintaan. Silakan coba lagi dalam beberapa saat.';

    // General
    case OPERATION_FAILED = 'Operasi gagal dilakukan.';
    case UNEXPECTED_ERROR = 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.';

    // Email Verification
    case INVALID_SIGNATURE = 'Link verifikasi tidak valid atau telah kadaluarsa. Silakan login untuk mendapatkan link verifikasi yang baru.';
}
