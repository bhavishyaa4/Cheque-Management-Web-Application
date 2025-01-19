<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Cheque;
use App\Models\Company;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ApplicantController extends Controller
{
    //
    public function create (Request $req){
        $company_id = $req->query('company_id');
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Fill the applicant details.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return Inertia::render('Applicant/Register',[
            'message' => 'Fill the applicant details.',
            'status' => 'success',
            'code' => 200,
            'company_id' => $company_id, 
        ]);
    }
    public function store(Request $req){
        $validator = Validator::make($req->all(),[
            'name' => 'required|string|max:50',
            'email' => 'email|required|unique:applicants,email',
            'password' => 'required|confirmed|min:6',
            'company_id' => 'required|exists:companies,id',
        ]);
        if($validator->fails()){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Validation Error Check the Validation.',
                    'status' => 'error',
                    'code' => 422,
                    'errors' => $validator->errors(),
                ]);
            }
            return back()->withErrors($validator)->withInput();
        }
        
        $applicant = Applicant::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
            'company_id' => $req->company_id,
        ]);
    Auth::guard('applicant')->login($applicant);
    $req->session()->regenerate();
    if($req->wantsJson()){
        return response()->json([
            'message' => 'Applicant Registered Successfully.',
            'status' => 'success',
            'code' => 200,
            ]);
        }
        return redirect()->route('applicant.login')->with('message','Applicant Registered Successfully');
    }

    public function loginForm(Request $req){
        $company_id = $req->query('company_id');
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Fill the Login details.',
                'status' => 'success',
                'code' => 200,
                'company_id' => $company_id,
            ]);
        }
        return Inertia::render('Applicant/Login',[
            'message' => 'Fill the Login details.',
            'status' => 'success',
            'code' => 200,
            'company_id' => $company_id,
        ]);
    }

    public function login(Request $req){
        $company_id = $req->input('company_id');
        $validator = Validator::make($req->all(),[
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if($validator->fails()){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Validation Error Check the Validation.',
                    'status' => 'error',
                    'code' => 422,
                    'errors' => $validator->errors()->toArray(),
                ]);
            }
            return Inertia::render('Applicant/Login',[
                'message' => 'Validation Error Check the Validation.',
                'status' => 'error',
                'code' => 422,
                'data' => $req->only('email'),
                'errors' => $validator->errors()->toArray(),
            ]);
        }
        $applicant = Applicant::where('email', $req->email)->where('company_id', $company_id)->first();
        if(!$applicant) {
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'No email record found for Applicant.',
                    'status' => 'error',
                    'code' => 401,
                    'errors' => [
                        'email' => 'No email record found for Applicant.',
                    ],
                ]);
            }
            return Inertia::render('Applicant/Login',[
                'message' => 'No email record found for Applicant.',
                'status' => 'error',
                'code' => 401,
                'data' => $req->only('email'),
                'errors' => [
                    'email' => 'No email record found for Applicant.',
                ],
            ]);         
        }
        if(!Hash::check($req->password, $applicant->password)){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Incorrect Password, Try Again.',
                    'status' => 'error',
                    'code' => 401,
                    'errors' => [
                        'password' => 'Incorrect Password.',
                    ],
                ]);
            }
            return Inertia::render('Applicant/Login',[
                'message' => 'Incorrect Password, Try Again.',
                'status' => 'error',
                'code' => 401,
                'data' => $req->only('email'),
                'errors' => [
                    'password' => 'Incorrect Password.',
                ],
            ]);
        }
        auth('applicant')->login($applicant);
        $req->session()->regenerate();
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Applicant Logged In Successfully.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return redirect()->route('applicant.dashboard');
    }

    public function home(Request $req)
    {
        $companies = Company::with('products')->get();
    
        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'Welcome to the applicant dashboard or company product listing.',
                'status' => 'success',
                'companies' => $companies,
                'code' => 200,
            ]);
        }
    
        return Inertia::render('Applicant/Home', [
            'message' => 'Welcome to the applicant dashboard or company product listing.',
            'status' => 'success',
            'companies' => $companies,
            'code' => 200,
        ]);
    }

    public function logout(Request $req)
    {
        Auth::guard('applicant')->logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();

        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'You have logged out successfully.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return redirect()->route('applicant.login');
    }
}
