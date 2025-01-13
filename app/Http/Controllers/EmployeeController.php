<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    //
    public function index(Request $req){
        $employees = Employee::all();

        if($req->wantsJson()){
            return response ()->json([
                'message'=> 'This is employee Page.',
                'data' => $employees,
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'message' => 'This is employee Page.',
            'status' => 'success',
            'code' => 201,
        ]);
    }
    public function create(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Please fill the employee details page.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('Employee/Create', [
            'message' => 'Please fill the employee details page.',
            'status' => 'success',
            'code' => 201,
        ]);
    }
    public function store(Request $req){
        $validator = Validator::make($req->all(),[
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:employees,email',
            'password' => 'required|confirmed|min:5'
        ]);

        if($validator->fails()){
            if($req->wantsJson()) {
                return response()->json([
                    'message' => 'Please fill the employee details page.',
                    'status' => 'error',
                    'code' => 400,
                    'errors' => $validator->errors()
                ]);
            }
            return back()->withErrors($validator)->withInput();
        }
        $employee = Employee::create($req->all());
        if($req->wantsJson()){
            return response()->json([
                'data' => $employee,
                'message' => 'Employee created successfully.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return redirect()->route('employee.index')->with('message', 'Employee created successfully.');
    }
}
