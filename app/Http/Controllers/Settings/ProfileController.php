<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileDeleteRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('dashboard/settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');

            // Delete old photo if exists
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }

            $imageContent = file_get_contents($file->getRealPath());
            $image = imagecreatefromstring($imageContent);

            if ($image !== false) {
                // Handle alpha transparency for PNGs
                imagepalettetotruecolor($image);
                imagealphablending($image, true);
                imagesavealpha($image, true);

                $filename = 'avatars/' . uniqid() . '.webp';
                
                // Capture the WebP output buffer
                ob_start();
                imagewebp($image, null, 80); // 80 is the quality
                $webpData = ob_get_clean();
                imagedestroy($image);

                // Save to the public storage
                Storage::disk('public')->put($filename, $webpData);
                $user->avatar_path = $filename;
            } else {
                // Fallback if conversion fails
                $user->avatar_path = $file->store('avatars', 'public');
            }
        }

        $user->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's profile.
     */
    public function destroy(ProfileDeleteRequest $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
