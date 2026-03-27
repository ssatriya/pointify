<?php

namespace App\Providers;

use App\Models\StudentClass;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        Model::preventLazyLoading();

        Inertia::share('studentClasses', function () {
            return StudentClass::with(['vocationalProgram'])->orderBy('order')
                ->get()
                ->map(fn($c) => [
                    'id' => $c->id,
                    'name' => $c->name,
                    'abbreviation' => $c->abbreviation,
                    'url' => route('dashboard.class.index', $c->slug),
                ]);
        });
    }
}
