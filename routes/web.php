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
    Route::get('/applicant/login', [ApplicantController::class, 'loginForm'])->name('applicant.loginForm');
    Route::post('/applicant/login', [ApplicantController::class, 'login'])->name('applicant.login');
    Route::get('/applicant/publicdash', [ApplicantController::class,'publicHome'])->name('applicant.publicdash');
    Route::post('/applicant/logout', [ApplicantController::class, 'logout'])->name('applicant.logout');   
    Route::middleware(['auth:applicant'])->group(function () {
        Route::get('/applicant/authdash', [ApplicantController::class, 'specificHome'])->name('applicant.authdash');
        Route::get('/applicant/products/{company_id}', [ApplicantController::class, 'products'])->name('applicant.products');
        Route::get('/applicant/buy/{product_id}', [ApplicantController::class, 'buyProduct'])->name('applicant.buyProduct');
        Route::post('/applicant/buy/{product_id}', [ApplicantController::class, 'submitCheque'])->name('applicant.submitCheque');
        Route::get('/applicant/cheques', [ApplicantController::class, 'cheques'])->name('applicant.cheques');
        Route::get('/applicant/checkout', [ApplicantController::class, 'checkout'])->name('applicant.checkout');
    });
    
Route::post('/logout', [CompanyController::class, 'logout'])->name('logout');
