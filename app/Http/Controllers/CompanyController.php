<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CompanyController extends Controller
{
    //

    public function index(Request $req){
        $compaines = Company::all();
        if($req->wantsJson()){
            return response()->json([
                'data' => $compaines,
                'message' => 'List of all companies.',
                'status' => 'success',
                'code' => 200,
            ]);
        }

        return Inertia::render('Company/Index',[
            'companies' => $compaines,
            'message' => 'List of all companies.',
            'status' => 'success',
            'code' => 200,
        ]);
    }
    public function create(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Fill the company details.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return Inertia::render('Company/Create',[
            'message' => 'Fill the company details.',
            'status' => 'success',
            'code' => 200,
        ]);
    }
    public function store(Request $req){
        $validator = Validator::make($req->all(),[
            'name' => 'required|string|max:50',
            'email' => 'email|required|unique:companies,email',
            'password' => 'required|confirmed|min:6',
            'address' => 'required|string|max:50',
            'phone' => 'required|numeric|digits:10',
        ]);
        if($validator->fails()){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Validation failed.',
                    'status' => 'error',
                    'code' => 422,
                    'errors' => $validator->errors(),
                ]);
            }
            return back()->withErrors($validator)->withInput();
        }
        $company = Company::create($req->all());
        if ($req->wantsJson()) {
            return response()->json([
                'data' => $company,
                'message' => 'Company created successfully.',
                'status' => 'success',
            ]);
        }
        return redirect()->route('company.index')->with('message', 'Company created successfully.');
    }
}
