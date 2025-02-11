<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SuperAdminController;
use Illuminate\Support\Facades\Route;


//Routes for SuperAdmin:
    Route::get('/superadmin/register',[SuperAdminController::class, 'create'])->name('superadmin.create');
    Route::post('/superadmin/register',[SuperAdminController::class, 'store'])->name('superadmin.store');
    Route::get('/superadmin/login',[SuperAdminController::class, 'loginForm'])->name('superadmin.loginForm');
    Route::post('/superadmin/login',[SuperAdminController::class, 'login'])->name('superadmin.login');
    Route::post('/superadmin/logout', [SuperAdminController::class, 'logout'])->name('superadmin.logout');

    Route::prefix('superadmin')->name('superadmin.')->middleware(['auth:superadmin'])->group(function () {
        Route::get('/home',[SuperAdminController::class,'index'])->name('home');
        Route::post('/approvecompany/{id}',[SuperAdminController::class, 'approveCompany'])->name('approveCompany');
        Route::post('/disablecompany/{id}',[SuperAdminController::class, 'disableCompany'])->name('disableCompany');
        Route::post('delete/{id}', [SuperAdminController::class, 'deleteCompany'])->name('deleteCompany');
        Route::get('/sendmail',[SuperAdminController::class, 'contactCompany'])->name('contact');
        Route::post('/processmail',[SuperAdminController::class, 'sendcontactCompany'])->name('send');

    });

// Routes for Company:
Route::get('/company/register', [CompanyController::class, 'create'])->name('company.create');
Route::post('/company/register', [CompanyController::class, 'store'])->name('company.store');
Route::get('/company/login', [CompanyController::class, 'loginForm'])->name('company.loginForm');
Route::post('/company/login', [CompanyController::class, 'login'])->name('login');
Route::post('/logout', [CompanyController::class, 'logout'])->name('company.logout');
    //Routes for Company Pending and Company Disable:
    Route::get('/company/pending', [CompanyController::class, 'pending'])->name('company.pending');
    Route::get('/company/disabled', [CompanyController::class, 'disabled'])->name('company.disabled');
    Route::get('/company/productpen',[CompanyController::class, 'productPen'])->name('company.productpen');
    Route::get('/company/employeepen',[CompanyController::class, 'employeePen'])->name('company.employeetpen');
    Route::get('/company/aboutpen',[CompanyController::class, 'aboutPen'])->name('company.aboutpen');
    Route::get('/company/contactpen',[CompanyController::class, 'contactPen'])->name('company.contactpen');

Route::middleware(['auth:company'])->group(function () {
    Route::get('/company/home', [CompanyController::class, 'home'])->name('company.home');
    Route::get('/company/trackers', [CompanyController::class, 'trackers'])->name('company.trackers');
    Route::get('/company/about',[CompanyController::class,'aboutCompany'])->name('about');
    Route::get('/company/contactus',[CompanyController::class,'contactUsAdmin'])->name('company.contact');
    Route::post('/company/contacted',[CompanyController::class, 'sendContactUsAdmin'])->name('company.contact.send');
    //Routes for Product:
        Route::get('/company/products', [ProductController::class, 'index'])->name('company.products');
        Route::get('/company/products/create', [ProductController::class, 'create'])->name('company.products.create');
        Route::post('/company/products', [ProductController::class, 'store'])->name('company.products.store');
        Route::get('/company/products/{id}/edit', [ProductController::class, 'edit'])->name('company.products.edit');
        Route::put('/company/products/{id}', [ProductController::class, 'update'])->name('company.products.update');
        Route::delete('/company/products/{id}', [ProductController::class, 'destroy'])->name('company.products.destroy');
        Route::get('/company/products/home', [ProductController::class, 'home'])->name('company.products.home');
        Route::get('/company/products/control', [ProductController::class, 'control'])->name('company.products.control');
        Route::get('/company/employees', [EmployeeController::class, 'employeeHome'])->name('company.employee');
        Route::get('/company/employees/{company_id}', [EmployeeController::class, 'viewEmployees'])->name('company.employees');
        Route::delete('/company/employee/{company_id}/{employeeId}', [EmployeeController::class, 'deleteEmployee'])->name('company.employee.delete');
});
//Route for Applicant:
    Route::get('/applicant/register', [ApplicantController::class, 'create'])->name('applicant.register');
    Route::post('/applicant/register', [ApplicantController::class, 'store']);
    Route::get('/applicant/login', [ApplicantController::class, 'loginForm'])->name('applicant.loginForm');
    Route::post('/applicant/login', [ApplicantController::class, 'login'])->name('applicant.login');
    Route::post('/applicant/logout',[ApplicantController::class, 'logout'])->name('applicant.logout');
    // Route::get('/applicant/publicdash', [ApplicantController::class,'publicHome'])->name('applicant.publicdash');
    Route::get('/', [ApplicantController::class,'publicHome'])->name('applicant.publicdash');
    Route::middleware(['auth:applicant'])->group(function () {
        Route::get('/applicant/authdash', [ApplicantController::class, 'specificHome'])->name('applicant.authdash');
        Route::get('/applicant/about', [ApplicantController::class, 'userHome'])->name('applicant.home');
        Route::get('/applicant/products/{company_id}', [ApplicantController::class, 'products'])->name('applicant.products');
        Route::get('/applicant/buy/{product_ids}', [ApplicantController::class, 'buyProduct'])->name('applicant.buyProduct');
        Route::post('/applicant/buy/{product_id}', [ApplicantController::class, 'submitCheque'])->name('applicant.submitCheque');
        Route::get('/applicant/cheques', [ApplicantController::class, 'cheques'])->name('applicant.cheques');
        Route::get('/applicant/checkout', [ApplicantController::class, 'checkout'])->name('applicant.checkout');
        Route::get('/applicant/contact',[ApplicantController::class, 'contactUs'])->name('applicant.contact');
        Route::post('/applicant/contact',[ApplicantController::class, 'sendContactUs'])->name('applicant.contact.send');
        Route::get('/applicant/edit-profile', [ApplicantController::class, 'applicantEdit'])->name('applicant.editprofile');
        Route::post('/applicant/update-profile', [ApplicantController::class, 'applicantUpdate'])->name('applicant.updateprofile');
    });

//Route for Employee:
        Route::prefix('employee')->name('employee.')->middleware('auth:company')->group(function () {
        Route::get('/register', [EmployeeController::class, 'create'])->name('create');
        Route::post('/register', [EmployeeController::class, 'store'])->name('store');
        Route::get('/login', [EmployeeController::class, 'loginForm'])->name('loginForm');
        Route::post('/login', [EmployeeController::class, 'login'])->name('login');
        Route::post('/logout', [EmployeeController::class, 'logout'])->name('logout');
        Route::get('/firstDash',[EmployeeController::class, 'firstPage'])->name('firstDash');
        Route::get('/tracker', [EmployeeController::class, 'tracker'])->name('tracker');
        Route::get('/dashboard', [EmployeeController::class, 'home'])->name('home');
        Route::get('/applicant/{applicantId}/cheques', [EmployeeController::class, 'showCheques'])->name('employee.applicant.cheques');
        Route::get('/cheques/edit/{chequeId}', [EmployeeController::class, 'editCheque'])->name('employee.cheques.edit');
        Route::put('/cheques/update/{chequeId}', [EmployeeController::class, 'updateCheque'])->name('employee.cheques.update');
        Route::get('/edit-profile', [EmployeeController::class, 'employeeEdit'])->name('editprofile');
        Route::post('/update-profile', [EmployeeController::class, 'employeeUpdate'])->name('updateprofile');
        Route::delete('/applicant/{applicantId}/delete',[EmployeeController::class, 'deleteApplicant'])->name('applicant.delete');
        Route::delete('/applicant/cheque/{cheque}',[EmployeeController::class, 'deleteCheque'])->name('applicant.cheque.delete');
    });

