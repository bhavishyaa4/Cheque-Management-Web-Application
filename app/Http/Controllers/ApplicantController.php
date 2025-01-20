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
        $company = Company::find($company_id);

        if (!$company) {
            return response()->json([
                'message' => 'Company name found.',
                'status' => 'error',
                'code' => 404
            ]);
        }
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Fill the applicant details.',
                'status' => 'success',
                'code' => 200,
                'company_id' => $company_id,
                'company_name' =>$company->name,
            ]);
        }
        return Inertia::render('Applicant/Register',[
            'message' => 'Fill the applicant details.',
            'status' => 'success',
            'code' => 200,
            'company_id' => $company_id,
            'company_name' => $company->name,
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
        $company = Company::find($req->company_id);
        $applicant = Applicant::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
            'company_id' => $req->company_id,
            'company_name' => $req->company_name,
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
        // return redirect()->route('applicant.login')->with('message','Applicant Registered Successfully');
        return redirect()->route('applicant.loginForm', ['company_id' => $req->company_id, 'company_name' => $company->name]);
    }

    public function loginForm(Request $req){
        $company_id = $req->query('company_id');
        $company = Company::find($company_id);
        if (!$company) {
            return response()->json([
                'message' => 'Company names not found.',
                'status' => 'error',
                'code' => 404
            ]);
        }
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Fill the Login details.',
                'status' => 'success',
                'code' => 200,
                'company_id' => $company_id,
                'company_name' => $company->name,
            ]);
        }
        return Inertia::render('Applicant/Login',[
            'message' => 'Fill the Login details.',
            'status' => 'success',
            'code' => 200,
            'company_id' => $company_id,
            'company_name' => $company->name,
        ]);
    }

    public function login(Request $req){
        $company_id = $req->input('company_id');
        $company = Company::find($company_id);
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
                'company_id' => $company_id,
                'company_name' => $company->name,
            ]);
        }
        return redirect()->route('applicant.authdash');
    }

    public function publicHome(Request $req)
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

    public function specificHome(Request $req){
        $applicant = Auth::guard('applicant')->user();
        $company = Company::with('products')->find($applicant->company_id); 

        if(!$company){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Company and Its Product not found.',
                    'status' => 'error',
                    'code' => 404,
                ]);
            }
            return redirect()->route('applicant.authdash');
        }
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Welcome to your Company Product Page.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return Inertia::render('Applicant/SpecificHome',[
            'company' => $company,
            'message' => 'Welcome to your Company Product Page.',
            'status' => 'success',
            'code' => 200,
        ]);
    }

    public function products($company_id)
    {
        $products = Product::where('company_id', $company_id)->get();

        return Inertia::render('Applicant/Products', [
            'products' => $products,
        ]);
    }

    public function buyProduct(Request $req, $product_id)
    {
        $product = Product::findOrFail($product_id);

        return Inertia::render('Applicant/BuyProduct', [
            'product' => $product,
        ]);
    }

    public function submitCheque(Request $req, $product_id)
    {
        $validator = Validator::make($req->all(), [
            'amount' => 'required|numeric',
            'bank_details' => 'required|string',
            'collected_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Cheque::create([
            'applicant_id' => Auth::id(),
            'product_id' => $product_id,
            'amount' => $req->amount,
            'bank_details' => $req->bank_details,
            'collected_date' => $req->collected_date,
            'status' => 'pending',
        ]);

        return redirect()->route('applicant.cheques')->with('message', 'Cheque submitted successfully.');
    }

    public function cheques()
    {
        $cheques = Cheque::where('applicant_id', Auth::id())
            ->with(['product'])
            ->get();

        return Inertia::render('Applicant/Cheques', [
            'cheques' => $cheques,
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
        return redirect()->route('applicant.publicdash');
    }
}
