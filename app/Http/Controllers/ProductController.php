<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProductController extends Controller
{
   
    public function index(Request $req){
        $products = Product::all();
        if($req->wantsJson()){
            return response()->json([
                'data' => $products,
                'message' => 'This is Product Page.',
                'status' => 'success',
                'code' => 200
            ]);
        }
        return Inertia::render('Product/Index',[
            'products' => $products,
            'message' => 'This is Product Page.',
            'status' => 'success',
            'code' => 200
        ]);
    }


    public function create(Request $req)
    {
        if($req->wantsJson()){
            return response()->json([
                'message' => 'This is Product Page.',
                'status' => 'success',
                'code' => 200
            ]);
        }
        return Inertia::render('Product/Create',[
            'message' => 'This is Product Page.',
            'status' => 'success',
            'code' => 200
        ]);
    }

    
    public function store(Request $req)
    {
        //
        $validator = Validator::make($req->all(),[
            'name' => 'required|string|max:50',
            'description' => 'required|string|max:500',
            'image' => 'required|mimes:png,jpg,jpeg',
            'price' => 'required|numeric'
        ]);
            if($validator->fails()){
                if($req->wantsJson()){
                return response()->json([
                    'message' => 'Validation Error',
                    'errors' => $validator->errors(),
                    'status' => 'error',
                    'code' => 422
                ]);
            }
            return back()->withErrors($validator)->withInput();
         }
         $product = Product::create($req->all());
         if($req->wantsJson()){
            return response()->json([
                'data' => $product,
                'message' => 'Product Created Successfully',
                'status' => 'success',
                'code' => 201
            ]);
         }
         return redirect()->route('product.index')->with('message','Product Created Successfully');
    }
}
