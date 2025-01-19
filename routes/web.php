<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Routes for Company:
Route::get('/company/register', [CompanyController::class, 'create'])->name('company.create');
Route::post('/company/register', [CompanyController::class, 'store'])->name('company.store');
Route::get('/company/login', [CompanyController::class, 'loginForm'])->name('login');
Route::post('/company/login', [CompanyController::class, 'login']);
Route::middleware(['auth:company'])->group(function () {
    Route::get('/company/home', [CompanyController::class, 'home'])->name('home');
    //Routes for Product:
        Route::get('/company/products', [ProductController::class, 'index'])->name('company.products');
        Route::get('/company/products/create', [ProductController::class, 'create'])->name('company.products.create');
        Route::post('/company/products', [ProductController::class, 'store'])->name('company.products.store');
        Route::get('/company/products/{id}/edit', [ProductController::class, 'edit'])->name('company.products.edit');
        Route::put('/company/products/{id}', [ProductController::class, 'update'])->name('company.products.update');
        Route::delete('/company/products/{id}', [ProductController::class, 'destroy'])->name('company.products.destroy');
        Route::get('/company/products/home', [ProductController::class, 'home'])->name('company.products.home');
        Route::get('/company/products/control', [ProductController::class, 'control'])->name('company.products.control');
    
});
//Route for Applicant:
    Route::get('/applicant/register', [ApplicantController::class, 'create'])->name('applicant.register');
    Route::post('/applicant/register', [ApplicantController::class, 'store']);
    Route::get('/applicant/login', [ApplicantController::class, 'loginForm'])->name('applicant.login');
    Route::post('/applicant/login', [ApplicantController::class, 'login']);
    Route::get('/applicant/dashboard', [ApplicantController::class, 'home'])
    ->name('applicant.dashboard')
    ->middleware('auth:applicant');
    Route::post('/applicant/logout', [ApplicantController::class, 'logout'])->name('applicant.logout');
    
Route::post('/logout', [CompanyController::class, 'logout'])->name('logout');
