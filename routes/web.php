<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;

// Routes for Company
Route::get('/company/register', [CompanyController::class, 'create'])->name('company.create');
Route::post('/company/register', [CompanyController::class, 'store'])->name('company.store');
Route::get('/company/login', [CompanyController::class, 'loginForm'])->name('login');
Route::post('/company/login', [CompanyController::class, 'login']);
Route::middleware(['auth:company'])->group(function () {
    Route::get('/company/home', [CompanyController::class, 'home'])->name('home');
});
Route::post('/logout', [CompanyController::class, 'logout'])->name('logout');