<?php

declare(strict_types=1);

it('has the landing page', function (): void {
    $page = visit('/');

    $page->assertPathIs('/')
        ->assertNoJavaScriptErrors();
});

it('may welcome the user', function () {
    $page = visit('/');

    $page->assertSee('Simplifying student reward and violation systems');
});
