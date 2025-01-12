<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ApplicantController extends Controller
{
    //
    public function index(Request $req){
        $applicants = Applicant::all();

        if($req->wantsJson()){
            return response()->json([
                'data' => $applicants,
                'message' => 'Data of Applicants.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
            return Inertia::render('Applicants/Index',[
                'applicants' => $applicants,
                'message' => 'Data of Applicants.',
                'status' => 'success',
                'code' => 200,
            ]);
    }

    public function create (Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Please fill the applicant details.',
                'status' => 'success',
                'code' => 200,
            ]);
        }

        return Inertia::render('Applicants/Create',[
            'message' => 'Please fill the applicant details.',
            'status' => 'success',
            'code' => 200,
        ]);
    }

    public function store(Request $req){
        $validator = Validator::make($req->all(), [
            'name' => 'string|required|max:50',
            'email' => 'email|required|unique:applicants,email',
            'password' => 'required|confirmed|min:6|string',
            'company_id' => 'required|exists:companies,id',
        ]);

        if($validator->fails()){
            if($req->wantsJson()){
                return response()->json([
                    'errors' => $validator->errors(),
                    'message' => 'Validation Failed Please Check your Input.',
                    'status' => 'error',
                    'code' => 422,
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

        auth()->login($applicant);

        if($req->wantsJson()){
            return response()->json([
                'message' => 'Registration Sucessfull.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return redirect()->route('applicant.index')->with('message', 'Registration Sucessfull.');
    }

    public function show(Request $req, Applicant $applicant){
        if($req->wantsJson()){
            return response()->json([
                'data' => $applicant,
                'message' => 'Applicant details Shown.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return Inertia::render('Applicants/Show',[
            'applicant' => $applicant,
            'message' => 'Applicant details Shown.',
            'status' => 'success',
            'code' => 200,
        ]);
    }

    public function update(Request $req, Applicant $applicant){
        $validator = Validator::make($req->all(),[
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:applicants,email,' . $applicant->id,
            'current_password' => 'nullable|string',
            'new_password' => 'nullable|string|confirmed|min:6',
        ]);

        if($validator->fails()){
            if($req->wantsJson()){
                return response()->json([
                    'errors' => $validator->errors(),
                    'message' => 'Validation Failed Please Check Your Input.',
                    'status' => 'error',
                    'code' => 422,
                ]);
            }
            return back()->withErrors($validator)->withInput();
        }
        if(!empty($req->current_password)){
            if(!Hash::check($req->current_password, $applicant->password)){
                return $req->wantsJson()
                ? response()->json([
                    'message' => 'Current Password is Incorrect.',
                    'status' => 'error',
                ], 400)
                : back()->withErrors(['current_password' => 'Password is incorrect.']);
            }
            if(!empty($req->new_password)){
                $applicant->password = Hash::make($req->new_password);
            }
        }
        $applicant->update($req->except(['current_password', 'new_password', 'new_password_confirmation']));

        if($req->wantsJson()){
            return response()->json([
                'message' => 'Applicant Updated Successfully.',
                'status' => 'error',
                'code'=> 201,
            ]);
        }
        return redirect()->route('applicant.index')->with('message', 'Applicant Updated Successfully.');
    }

    public function destory(Request $req, Applicant $applicant){
        $applicant->delete();

        if($req->wantsJson()){
            return response()->json([
                'message' => 'Applicant Deleted Sucessfully',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return redirect()->route('applicant.index')->with('message', 'Applicant Deleted Successfully.');
    } 
}
