<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function create(Request $req)
    {
        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'Fill the company details.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return Inertia::render('Company/Register', [
            'message' => 'Fill the company details.',
            'status' => 'success',
            'code' => 200,
        ]);
    }

    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|max:50',
            'email' => 'email|required|unique:companies,email',
            'password' => 'required|confirmed|min:6',
            'address' => 'required|string|max:50',
            'phone' => 'required|numeric|digits:10',
        ]);

        if ($validator->fails()) {
            if ($req->wantsJson()) {
                return response()->json([
                    'message' => 'Validation failed.',
                    'status' => 'error',
                    'code' => 422,
                    'errors' => $validator->errors(),
                ]);
            }
            return back()->withErrors($validator)->withInput();
        }

        $user = Company::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
            'address' => $req->address,
            'phone' => $req->phone,
            'status' => 'Pending',
        ]);

        auth('company')->login($user);
        $req->session()->regenerate();

        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'Company created successfully.',
                'status' => 'success',
            ]);
        }

        return redirect()->route('company.loginForm')->with('message', 'Company created successfully.');
    }

        public function login(Request $req)
        {
            $validator = Validator::make($req->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                if ($req->wantsJson()) {
                    return response()->json([
                        'errors' => $validator->errors()->toArray(),
                        'message' => 'Validation failed.',
                        'status' => 'error',
                        'code' => 422,
                    ]);
                }
                return Inertia::render('Company/Login', [
                    'errors' => $validator->errors()->toArray(),
                    'data' => $req->only('email'),
                ]);
            }

            $user = Company::where('email', $req->email)->first();

            if (!$user) {
                if ($req->wantsJson()) {
                    return response()->json([
                        'message' => 'No company records found in the database.',
                        'status' => 'error',
                        'code' => 401,
                        'errors' => [
                            'email' => 'No company records found in the database.'
                        ],
                    ]);
                }
                return Inertia::render('Company/Login', [
                    'message' => 'No company records found in the database.',
                    'status' => 'error',
                    'code' => 401,
                    'errors' => [
                        'email' => 'No company records found in the database.'
                    ],
                    'data' => $req->only('email'),
                ]);
            }

            if (!Hash::check($req->password, $user->password)) {
                if ($req->wantsJson()) {
                    return response()->json([
                        'message' => 'Incorrect password, Try again.',
                        'status' => 'error',
                        'code' => 401,
                        'errors' => [
                            'password' => 'Incorrect password, Try again.'
                        ],
                    ]);
                }
                return Inertia::render('Company/Login', [
                    'message' => 'Incorrect password, Try again.',
                    'status' => 'error',
                    'code' => 401,
                    'errors' => [
                        'password' => 'Incorrect password, Try again.'
                    ],
                    'data' => $req->only('email'),
                ]);
            }

            if($user->status === 'Pending'){
                if($req->wantsJson()){
                    return response()->json([
                        'message' => 'Your Registration is Under Review.',
                        'status' => 'error',
                        'code' => 403,
                    ]);
                }
                // return Inertia::render('Company/Pending',[
                //     'message' => 'Your Registration is Under Review.',
                //     'status' => 'error',
                //     'code' => 403,
                // ]) ;
                return redirect()->route('company.pending');
            }
            else if($user->status === 'Disabled'){
                if($req->wantsJson()){
                    return response()->json([
                        'message' => 'Your Company is Currenlty Disabled for the moment.',
                        'status' => 'error',
                        'code' => 403,
                    ]);
                }
                // return Inertia::render('Company/Disabled',[
                //     'message' => 'Your Company is Currenlty Disabled for the moment.',
                //     'status' => 'error',
                //     'code' => 403,
                // ]) ;
                return redirect()->route('company.disabled');
            }

            auth('company')->login($user);
            $req->session()->regenerate();

            if ($req->wantsJson()) {
                return response()->json([
                    'message' => 'Login Successful.',
                    'status' => 'success',
                    'code' => 200,
                ]);
            }

            return redirect()->route('company.home');
        }


    public function loginForm(Request $req)
    {
        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'Login to your company account.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return Inertia::render('Company/Login', [
            'message' => 'Login to your company account.',
            'status' => 'success',
            'code' => 200,
        ]);
    }

    public function home(Request $req)
    {
        $user = auth('company')->user();

        if (!$user) {
            return redirect()->route('company.loginForm');
        }

        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'Welcome to the company dashboard.',
                'status' => 'success',
                'company_name' => $user->name,
                'company_id' => $user->id,
                'code' => 200,
            ]);
        }
        return Inertia::render('Company/Home', [
            'message' => 'Welcome to your company dashboard.',
            'status' => 'success',
            'company_name' => $user->name,
            'company_id' => $user->id,
            'code' => 200,
        ]);
    }

    public function aboutCompany(Request $req)
    {
        $user = auth('company')->user();

        if (!$user) {
            return redirect()->route('company.loginForm');
        }

        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'Welcome to the company dashboard.',
                'status' => 'success',
                'company_name' => $user->name,
                'company_id' => $user->id,
                'code' => 200,
            ]);
        }
        return Inertia::render('Company/About', [
            'message' => 'Welcome to your company dashboard.',
            'status' => 'success',
            'company_name' => $user->name,
            'company_id' => $user->id,
            'code' => 200,
        ]);
    }

    public function contactUsAdmin (Request $req){

        $user = auth('company')->user();
        if(!$user){
            return redirect()->route('company.loginForm');
        }
        if($req -> wantsJson()){
            return response()->json([
                'message' => 'Welcome To Contact Us Page.',
                'code' => 201,
                'status' => 'success',
                'company_id' => $user->id,
                'company_name' => $user->name,
            ]);
        } 
        return Inertia::render('Company/Contact',[
            'message' => 'Welcome To Contact Us Page.',
            'status' => 'success',
            'code' => 201,
            'company_id' => $user->id,
            'company_name' => $user->name,
        ]);
    }

    public function sendContactUsAdmin (Request $req){
        $validator = Validator::make($req->all(),[
         'name' => 'required|string|max:50',
         'email' => 'required|email|max:100',
         'messageContent' => 'required|string|max:1000', 
        ]);
 
        if($validator->fails()){
         if($req->wantsJson()){
             return response()->json([
                 'message' => 'Please fill the required fields.',
                 'status' => 'error',
                 'code' => 201,
                 'errors' => $validator->errors(),
                 ]);
             }
             return back()->withErrors($validator)->withInput();
        }
        Mail::send('emails.companycontact',[
         'name' => $req->name,
         'email' => $req->email,
         'messageContent' => $req->messageContent,
        ], function($mail) use ($req) {
         $mail->to('bhavishyasunuwarrai4@gmail.com')
             ->subject('New Contact Message Form Company.')
             ->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
             ->replyTo($req->email, $req->name);
        });
     }

     public function productPen(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Pending Product Page.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('CompanyPen/ProductPen',[
            'message' => 'Pending Product Page.',
            'status' => 'success',
            'code' => 201,
        ]);
     }

     public function employeePen(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Pending Employee Page.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('CompanyPen/EmployeePen',[
            'message' => 'Pending Employee Page.',
            'status' => 'success',
            'code' => 201,
        ]);
     }

     public function aboutPen(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Pending About Page.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('CompanyPen/AboutPen',[
            'message' => 'Pending About Page.',
            'status' => 'success',
            'code' => 201,
        ]);
     }

     public function contactPen(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Pending Contact Page.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('CompanyPen/ContactPen',[
            'message' => 'Pending Contact Page.',
            'status' => 'success',
            'code' => 201,
        ]);
     }

     public function productDis(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Disable Product Page.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('CompanyDis/ProductDis',[
            'message' => 'Disable Product Page.',
            'status' => 'success',
            'code' => 201,
        ]);
     }

     public function employeeDis(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Disable Employee Page.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('CompanyDis/EmployeeDis',[
            'message' => 'Disable Employee Page.',
            'status' => 'success',
            'code' => 201,
        ]);
     }

     public function aboutDis(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Disable About Page.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('CompanyDis/AboutDis',[
            'message' => 'Disable About Page.',
            'status' => 'success',
            'code' => 201,
        ]);
     }

     public function contactDis(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Disable Contact Page.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('CompanyDis/ContactDis',[
            'message' => 'Disable Contact Page.',
            'status' => 'success',
            'code' => 201,
        ]);
     }

    public function logout(Request $req)
    {
        Auth::guard('company')->logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();

        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'You have logged-out successfully',
                'status' => 200,
                'success' => true,
            ]);
        }
        return redirect()->route('login');
    }

    public function trackers(Request $request)
    {
        $company = Auth::guard('company')->user();
        
        $cheques = $company->cheques()->get();
        $totalCheques = $cheques->count();
    
        $chequeCounts = [
            'pending' => $cheques->where('status', 'Pending')->count(),
            'hold' => $cheques->where('status', 'Hold')->count(),
            'cancelled' => $cheques->where('status', 'Cancelled')->count(),
            'completed' => $cheques->where('status', 'Completed')->count(),
        ];
    
        $totalUsers = $company->applicants()->count();
        $totalProducts = $company->products()->count();
        $totalEmployess = $company->employees()->count();
    
        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Tracker data retrieved successfully',
                'status' => 'success',
                'totalCheques' => $totalCheques,
                'chequeCounts' => $chequeCounts,
                'totalUsers' => $totalUsers,
                'totalProducts'=> $totalProducts,
                'totalEmployess' => $totalEmployess,
                'company_id' => $company->id,
                'company_name' => $company->name,
                'code' => 200,
            ]);
        }
    
        return Inertia::render('Company/Tracker', [
            'message' => 'Tracker data retrieved successfully',
            'status' => 'success',
            'totalCheques' => $totalCheques,
            'chequeCounts' => $chequeCounts,
            'totalUsers' => $totalUsers,
            'totalProducts'=> $totalProducts,
            'totalEmployess' => $totalEmployess,
            'company_id' => $company->id,
            'company_name' => $company->name,
            'code' => 200,
        ]);
    }

    public function pending(Request $req)
    {

        return Inertia::render('Company/Pending', [
            'message' => 'Your Registration is Under Review.',
            'status' => 'error',
            'code' => 403,
        ]);
    }
    public function disabled()
    {
        return Inertia::render('Company/Disabled', [
            'message' => 'Your Registration is Under Review.',
            'status' => 'error',
            'code' => 403,
        ]);
    }
}
