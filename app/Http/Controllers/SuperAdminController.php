<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\SuperAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use PDO;

class SuperAdminController extends Controller
{
    
    public function create (Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Welcome Admin to The Registration Page.',
                'status' => 'success',
                'code' => 201
            ]);
        }
        return Inertia::render('SuperAdmin/AdminRegister',[
            'message' => 'Welcome Admin to The Registration Page.',
            'status' => 'success',
            'code' => 201
        ]);
    }

    public function store(Request $req){
        $validator = Validator::make($req->all(),[
            'name' => 'required|string|max:100',
            'email' => 'required|email|string|unique:super_admins,email',
            'username' => 'required|string|unique:super_admins,username',
            'role' => 'required|string|max:100',
            'password' => 'required|confirmed|min:6'
        ]);
        if($validator->fails()){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Validation Error',
                    'status' => 'error',
                    'code' => 422,
                    'errors' => $validator->errors(),
                ]);
            }
            return back()->withErrors($validator)->withInput();
        }
        $user = SuperAdmin::create([
            'name' => $req->name,
            'email' => $req->email,
            'username' => $req->username,
            'role' => $req->role,
            'password' => Hash::make($req->password),
        ]);
        auth('superadmin')->login($user);
        $req->session()->regenerate();

        if($req->wantsJson()){
            return response()->json([
                'message' => 'Welcome to The Server Admin.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return redirect()->route('superadmin.loginForm')->with('message', 'Welcome to The Server Admin.');
    }

    public function loginForm(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Welcome Admin to The Login Page.',
                'status' => 'success',
                'code' => 201
            ]);
        }
        return Inertia::render('SuperAdmin/AdminLogin',[
            'message' => 'Welcome Admin to The Login Page.',
            'status' => 'success',
            'code' => 201
        ]);
    }

    public function login(Request $req){
        $validator = Validator::make($req->all(),[
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if($validator->fails()){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Validation Error',
                    'status' => 'error',
                    'code' => 422,
                    'errors' => $validator->errors(),
                ]);
            }
            return Inertia::render('SuperAdmin/AdminLogin',[
                'message' => 'Validation Error',
                'status' => 'error',
                'code' => 422,
                'data' => $req->only('email'),
                'errors' => $validator->errors(),
            ]);
        }
        $admin = SuperAdmin::where('email', $req->email)->first();

        if(!$admin){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Admin Data not Found.',
                    'status' => 'error',
                    'errors' => [
                        'email' => 'No Admin Record Found.'
                    ],
                    'code' => 404
                ]);
            }
            return Inertia::render('SuperAdmin/AdminLogin',[
                'message' => 'Admin Not Found',
                'status' => 'error',
                'code' => 404,
                'errors' => [
                        'email' => 'No Admin Record Found.'
                    ],
                'data' => $req->only('email'),
            ]);
        }
        if(!Hash::check($req->password, $admin->password)){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Admin Data not Found.',
                    'status' => 'error',
                    'errors' => [
                        'password' => 'Incorrect Password.'
                    ],
                    'code' => 404
                ]);
            }
            return Inertia::render('SuperAdmin/AdminLogin',[
                'message' => 'Admin Not Found',
                'status' => 'error',
                'code' => 404,
                'errors' => [
                        'password' => 'Incorrect Password.'
                    ],
                'data' => $req->only('email'),
            ]);
        }
        auth('superadmin')->login($admin);
        $req->session()->regenerate();
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Welcome to The Server Admin.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return redirect()->route('superadmin.home')->with('message', 'Welcome to The Server Admin.');
    }

    public function index(Request $req){
        $admin = auth('superadmin')->user();

        if (!$admin) {
            return redirect()->route('superadmin.loginForm');
        }
        $company = Company::all();
        if($req->wantsJson()){
            return response()->json([
                'message' => 'All companies are Fetched.',
                'status' => 'success',
                'code' => 201,
                'admin_name' => $admin->name,
                'admin_id' => $admin->id,
                'company' => $company
            ]);
        }
        return Inertia::render('SuperAdmin/AdminDash',[
            'message' => 'All companies are Fetched.',
            'status' => 'success',
            'code' => 201,
            'admin_name' => $admin->name,
            'admin_id' => $admin->id,
            'company' => $company 
        ]);
    }

    public function approveCompany(Request $req, $id){
        $company = Company::find($id);
        if(!$company){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Admin Panel Company Not Found',
                    'status' => 'error',
                    'code' => 404
                ]);
            }
        }
        $company->update([
            'status' => 'Approved',
        ]);
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Company Approved Successfully',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('SuperAdmin/AdminDash',[
            'message' => 'Company Approved Successfully',
            'status' => 'success',
            'code' => 201,
        ]);
    }

    public function disableCompany(Request $req, $id){
        $company = Company::find($id);
        if(!$company){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Admin Panel Company Not Found',
                    'status' => 'error',
                    'code' => 404
                ]);
            }
        }
        $company->update([
            'status' => 'Disabled',
        ]);
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Company Disabled Successfully',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('SuperAdmin/AdminDash',[
            'message' => 'Company Disabled Successfully',
            'status' => 'success',
            'code' => 201,
        ]);
    }
    
    public function deleteCompany(Request $req, $id){
        $company = Company::with(['employees', 'products', 'applicants'])->find($id);
        if(!$company){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Admin Panel Company Not Found',
                    'status' => 'error',
                    'code' => 404
                ]);
            }
        }
        $company->employees()->delete();
        $company->products()->delete();
        $company->applicants()->delete();
        $company->delete();
        
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Company and All Related Data Deleted Successfully.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return Inertia::render('SuperAdmin/AdminDash',[
            'message' => 'Company and All Related Data Deleted Successfully.',
            'status' => 'success',
            'code' => 200,
        ]);
    }

    public function logout(Request $req){
        auth('superadmin')->logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();

        if($req->wantsJson()){
            return response()->json([
                'message' => 'Logged Out Successfully.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return redirect()->route('superadmin.loginForm')->with('message', 'You Have Logged-Out Successfully !! To Enter the AdminDash Page !! Login Again.');
    }
}
