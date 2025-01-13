<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Cheque;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ChequeController extends Controller
{
    
  public function index(Request $req){
    $cheques = Cheque::all();
    if($req->wantsJson()){
        return response()->json([
            'data' => $cheques,
            'status' => 'success',
            'message' => 'Cheques retrieved successfully.'
            ]);
        }
        return Inertia::render('Cheques/Index',[
            'cheques' => $cheques,
            'message' => 'Cheques retrieved successfully.',
            'status' => 'success',
            'code' => 201,
        ]);
    }
    public function create(Request $req, Applicant $applicant){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Please Fill in the cheque details.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return Inertia::render('Cheques/Create',[
            'applicant' => $applicant,
            'message' => 'Please Fill in the cheque details.',
            'status' => 'success',
            'code' => 201,
        ]);
    }
    public function store(Request $req, Applicant $applicant){
        $validator = Validator::make($req->all(),[
            'amount' => 'required|numeric',
            'bank_details' => 'required|string',
        ]);
        if($validator->fails()){
            if($req->wantsJson()){
                return response()->json([
                    'errors' => $validator->errors(),
                    'message' => 'Validation Failed.',
                    'status' => 'error',
                    'code' => 422,
                ]);
            }
                return back()->withErrors($validator)->withInput();
        }
        $cheque = Cheque::create([
            'applicant_id' => $applicant->id,
            'amount' => $req->amount,
            'bank_details' => $req->bank_details,
        ]);
        if($req->wantsJson()){
            return response()->json([
                'data' => $cheque,
                'message' => 'Cheque created successfully.',
                'status' => 'success',
                'code' => 201,
            ]);
        }
        return redirect()->route('cheques.index')->with('message', 'Cheque created successfully.');
    }
}
