<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;

//Routes for Company:

    Route::get('/company/register', [CompanyController::class, 'create'])->name('company.create');
    Route::post('/company/register', [CompanyController::class, 'store'])->name('company.store');
    Route::get('/company/login', [CompanyController::class, 'loginForm'])->name('company.login.form');
    Route::post('/company/login', [CompanyController::class, 'login'])->name('login');
    Route::middleware(['auth'])->get('/company/dashboard', [CompanyController::class, 'dashboard'])->name('company.dashboard');
    Route::middleware(['auth'])->post('/company/logout', [CompanyController::class, 'logout'])->name('company.logout');
