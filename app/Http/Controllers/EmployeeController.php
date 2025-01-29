<?php
namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Cheque;
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
    public function employeeHome (Request $req){

        $company_id = $req->query('company_id');
        $company = Company::find($company_id);

        if (!$company) {
            return response()->json([
                'message' => 'Companys not found.',
                'status' => 'error',
                'code' => 404
            ]);
        }
        // $user = auth('company')->user();
        // if (!$user) {
        //     return redirect()->route('login');
        // }
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Welcome to the company employee page.',
                    'status' => 'success',
                    'company_id' => $company_id,
                    'company_name' => $company->name,
                    'code' => 201,
                ]);
            }
        return Inertia::render('Company/EmployeePage',[
            'message' => 'Welcome to the company employee page.',
            'status' => 'success',
            'company_id' => $company_id,
            'company_name' => $company->name,
            'code' => 201,
        ]); 
    }

    public function viewEmployees(Request $req, $company_id)
{
    $company = Company::find($company_id);
    
    if (!$company) {
        return response()->json([
            'message' => 'Company not found.',
            'status' => 'error',
            'code' => 404,
        ]);
    }

    // Fetch employees for the company
    $employees = Employee::where('company_id', $company_id)->get();

    if ($req->wantsJson()) {
        return response()->json([
            'message' => 'Employee list displayed.',
            'status' => 'success',
            'code' => 201,
            'company_name' => $company->name,
            'company_id' => $company_id,
            'employees' => $employees,
        ]);
    }

    return Inertia::render('Employee/EmployeeListPage', [
        'company_id' => $company_id,
        'company_name' => $company->name,
        'employees' => $employees,
        'message' => 'Employees for the company.',
        'status' => 'success',
    ]);
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

        return redirect()->route('employee.firstDash');
    }

    public function firstPage(Request $req){
        $employee = Auth::guard('employee')->user();
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Welcome to the first page.',
                'status' => 'success',
                'employeeName' => $employee->name,
                'code' => 200,
            ]);
        }
        return Inertia::render('Employee/FirstPage',[
            'message' => 'Welcome to the first page.',
            'status' => 'success',
            'employeeName' => $employee->name,
            'code' => 200,
        ]);
    }

    public function home(Request $req)
    {
        $employee = Auth::guard('employee')->user();
        $company = $employee->company;

        if (!$company) {
            return redirect()->route('employee.loginForm')->withErrors([
                'message' => 'Employee is not associated with any company.',
            ]);
        }

        $applicants = $company->applicants()->with('cheques')->get();
        return Inertia::render('Employee/Home', [
            'message' => 'Employee Home Page.',
            'status' => 'success',
            'code' => 200,
            'applicants' => $applicants,
            'employeeName' => $employee->name,
        ]);
    }

    public function showCheques(Request $req, $applicantId)
    {
        $applicant = Applicant::find($applicantId);

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
                'status' => 'error',
            ], 404);
        }

        $cheques = $applicant->cheques()->with('products')->get();

        if ($req->wantsJson()) {
            return response()->json([
                'message' => 'Cheques of Applicant.',
                'status' => 'success',
                'code' => 200,
                'cheques' => $cheques,
            ]);
        }

        return Inertia::render('Employee/Cheques', [
            'message' => 'Cheques of Applicant.',
            'status' => 'success',
            'code' => 200,
            'cheques' => $cheques,
        ]);
    }

    public function editCheque($chequeId)
    {
        $cheque = Cheque::find($chequeId);

        if (!$cheque) {
            return redirect()->route('employee.home')->with('error', 'Cheque not found');
        }

        return Inertia::render('Employee/EditCheque', [
            'cheque' => $cheque,
        ]);
    }

    public function updateCheque(Request $req, $chequeId)
    {
        $cheque = Cheque::find($chequeId);

        if (!$cheque) {
            return response()->json([
                'message' => 'Cheque not found.',
                'status' => 'error',
                'code' => 404,
            ]);
        }

        $validator = Validator::make($req->all(), [
            'status' => 'required|in:pending,hold,cancelled,ok',
            'amount' => 'required|numeric',
            'collected_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Error.',
                'status' => 'error',
                'code' => 422,
                'errors' => $validator->errors(),
            ]);
        }

        $cheque->status = $req->status;
        $cheque->amount = $req->amount;
        $cheque->collected_date = $req->collected_date;

        if ($cheque->status == 'cancelled') {
            $cheque->delete();
            return response()->json([
                'message' => 'Cheque cancelled and deleted.',
                'status' => 'success',
                'code' => 200,
            ]);
        }

        $cheque->save();

        return response()->json([
            'message' => 'Cheque updated successfully.',
            'status' => 'success',
            'code' => 200,
            'cheque' => $cheque,
        ]);
    }

    public function logout(Request $req)
    {
        Auth::guard('employee')->logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();

        return redirect()->route('employee.loginForm');
    }

    public function deleteEmployee(Request $req, $company_id, $employeeId){
        $employee = Employee::findOrFail($employeeId);
        $employee->delete();
        return redirect()->route('company.employees', ['company_id' => $company_id])
                         ->with('success', 'Employee deleted successfully.');
    }
}
