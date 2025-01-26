<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function create(Request $req)
    {
        $company_id = $req->query('company_id');
        $company = Company::find($company_id);

        if (!$company) {
            return response()->json([
                'message' => 'Company not found.',
                'status' => 'error',
                'code' => 404
            ]);
        }

        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'Fill the employee details.',
                'status' => 'success',
                'code' => 200,
                'company_id' => $company_id,
                'company_name' => $company->name,
            ]);
        }

        return Inertia::render('Employee/Register', [
            'message' => 'Fill the employee details.',
            'status' => 'success',
            'code' => 200,
            'company_id' => $company_id,
            'company_name' => $company->name,
        ]);
    }

    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:employees,email',
            'password' => 'required|confirmed|min:6',
            'company_id' => 'required|exists:companies,id',
        ]);

        if ($validator->fails()) {
            if ($req->wantsJson()) {
                return response()->json([
                    'message' => 'Validation Error.',
                    'status' => 'error',
                    'code' => 422,
                    'errors' => $validator->errors(),
                ]);
            }

            return back()->withErrors($validator)->withInput();
        }

        $company = Company::find($req->company_id);
        $employee = Employee::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
            'company_id' => $req->company_id,
        ]);

        Auth::guard('employee')->login($employee);
        $req->session()->regenerate();

        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'Employee Registered Successfully.',
                'status' => 'success',
                'code' => 200,
            ]);
        }

        return redirect()->route('employee.loginForm', ['company_id' => $req->company_id, 'company_name' => $company->name]);
    }

    public function loginForm(Request $req)
    {
        $company_id = $req->query('company_id');
        $company = Company::find($company_id);

        if (!$company) {
            return response()->json([
                'message' => 'Company not found.',
                'status' => 'error',
                'code' => 404
            ]);
        }

        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'Fill the Login details.',
                'status' => 'success',
                'code' => 200,
                'company_id' => $company_id,
                'company_name' => $company->name,
            ]);
        }

        return Inertia::render('Employee/Login', [
            'message' => 'Fill the Login details.',
            'status' => 'success',
            'code' => 200,
            'company_id' => $company_id,
            'company_name' => $company->name,
        ]);
    }

    public function login(Request $req)
    {
        $company_id = $req->input('company_id');
        $company = Company::find($company_id);
        $validator = Validator::make($req->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            if ($req->wantsJson()) {
                return response()->json([
                    'message' => 'Validation Error.',
                    'status' => 'error',
                    'code' => 422,
                    'errors' => $validator->errors(),
                ]);
            }

            return back()->withErrors($validator)->withInput();
        }

        $employee = Employee::where('email', $req->email)->where('company_id', $company_id)->first();
        if (!$employee) {
            return back()->withErrors(['email' => 'No account found.'])->withInput();
        }

        if (!Hash::check($req->password, $employee->password)) {
            return back()->withErrors(['password' => 'Incorrect Password.'])->withInput();
        }

        Auth::guard('employee')->login($employee);
        $req->session()->regenerate();

        return redirect()->route('employee.home');
    }

    public function home(Request $req){
        $employee = Auth::guard('employee')->user();
        $company = $employee->company;

        if(!$company){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Employee is not associated with any company.',
                    'status' => 'error',
                    'code' => 404,
                ]);
            }
            return redirect()->route('employee.loginForm')->withErrors([
                'message' => 'Employee is not assocateid with any company.',
            ]);
        }

        $applicants = $company->applicants()->with('cheques')->get();
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Employee Home Page.',
                'status' => 'success',
                'code' => 200,
                'data' => $applicants,
            ]);
        }
        return Inertia::render('Employee/Home',[
            'message' => 'Employee Home Page.',
            'status' => 'success',
            'code' => 200,
            'data' => $applicants,
        ]);
    }

    public function logout(Request $req)
    {
        Auth::guard('employee')->logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();

        return redirect()->route('employee.loginForm');
    }
}
