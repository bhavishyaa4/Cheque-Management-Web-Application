<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Cheque;
use App\Models\Company;
use App\Models\Product;
use App\Rules\UniqueAccountNumber;
use App\Rules\UniqueEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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
            'email' => [
                'required',
                'email',
                new UniqueEmail(Auth::id(), $req->company_id),
            ],
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
                'message' => 'Browse your favourite product in your desired company.',
                'status' => 'success',
                'companies' => $companies,
                'code' => 200,
            ]);
        }
    
        return Inertia::render('Applicant/Home', [
            'message' => 'Browse your favourite product in your Desired Company.',
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

    public function userHome(Request $req)
    {
        $user = auth('company')->user();
        if(!$user){
            return response()->json([
                'message' => 'Company Not found.',
                'status' => 'error',
                'code' => 201,
            ]);
        }
        return Inertia::render('Applicant/About', [
            'message' => 'Applicant About Us Page.',
            'status' => 'success',
            'code' => 201,
            'company_id' => $user->id,
            'company_name' => $user->name,
        ]);
    }

    public function products($company_id)
    {
        $products = Product::where('company_id', $company_id)->get();

        return Inertia::render('Applicant/Products', [
            'products' => $products,
        ]);
    }

    public function buyProduct(Request $req,$product_ids)
    {
    $product_ids = explode(',', $product_ids);
    $products = Product::whereIn('id', $product_ids)->get();
    $amount = $req->query('amount', 0);
    return Inertia::render('Applicant/BuyProduct', [
        'products' => $products,
        'amount' => $amount,
        'message' => 'Fill the Cheque details.',
        'status' => 'success',
        'code' => 200,
    ]);
    }

    public function submitCheque(Request $req)
    {
        $companyId = Auth::user()->company_id;
        $validator = Validator::make($req->all(), [
            'amount' => 'required|numeric',
            'bank_name' => 'required|string|max:100',
            'bearer_name' =>'required|string|max:50',
            'account_number' => [
                'required',
                'numeric',
                'min_digits:12', 
                new UniqueAccountNumber(Auth::id(), $companyId), 
            ],
            'collected_date' => 'required|date',
            'location' => 'required|string|max:100',
            'number' => 'required|string|max:10',
            'product_ids' => 'required|array|min:1',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $cheque = Cheque::create([
            'applicant_id' => Auth::id(),
            'amount' => $req->amount,
            'bank_name' => $req->bank_name,
            'bearer_name' => $req->bearer_name,
            'account_number' => $req->account_number,
            'collected_date' => $req->collected_date,
            'location' => $req->location,
            'number' => $req->number,
            'status' => 'pending',
            // 'company_id' => $companyId,
            'company_id' => Auth::user()->company_id,
        ]);
        $cheque->products()->attach($req->product_ids);
        return redirect()->route('applicant.cheques')->with('message', 'Cheque submitted successfully.');
    }

    public function cheques()
    {

        $applicant = Auth::guard('applicant')->user();
        $companyId = $applicant->company_id;


        $cheques = Cheque::where('applicant_id', $applicant->id)
        ->where('company_id', $companyId)
        ->with('products')
        ->get();

        return Inertia::render('Applicant/Cheques', [
            'cheques' => $cheques,
        ]);
    }

    public function contactUs (Request $req){
        if($req -> wantsJson()){
            return response()->json([
                'message' => 'Welcome To Contact Us Page.',
                'code' => '201',
                'status' => 'success',
            ]);
        } 
        return Inertia::render('Applicant/Contact',[
            'message' => 'Welcome To Contact Us Page.',
            'status' => 'success',
            'code' => 201,
        ]);
    }

    public function sendContactUs (Request $req){
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
       Mail::send('emails.contact',[
        'name' => $req->name,
        'email' => $req->email,
        'messageContent' => $req->messageContent,
       ], function($mail) use ($req) {
        $mail->to('bhavishyasunuwarrai4@gmail.com')
            ->subject('New Contact Message From Applicant.')
            ->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
            ->replyTo($req->email, $req->name);
       });
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
