<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProductController extends Controller
{
   
    public function index(Request $req){
        $user = auth('company')->user();
        if(!$user){
            return redirect()->route('login');
        }  
        $products = Product::where('company_id', $user->id)->get();
       if($req->wantsJson()){
        return response()->json([
            'products' => $products,
            'message' => 'Products fetched successfully.',
            'status' => 'success',
            'code' => 200,
            ]);
        }
        return Inertia::render('Company/ProductsPage',[
            'products' => $products,
            'message' => 'Products fetched successfully.',
            'status' => 'success',
            'code' => 200,
        ]);
    }
    public function create(Request $req){
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Create a Product.',
                'status' => 'success',
                'code' => 201,
            ]); 
        }
        return Inertia::render('Product/Create',[
            'message' => 'Create a New Product.',
            'status' => 'success',
            'code' => 201,
        ]);
    }
    public function store(Request $req){
        $validator = Validator::make($req->all(),[
            'name' => 'required|string|max:50',
            'description' => 'required|string|max:500',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpg,png,jpeg'
        ]);
        if($validator->fails()){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Validation Error.',
                    'errors' => $validator->errors(),
                    'status' => 'error',
                    'code' => 422,
                ]);
            }

            return back()->withErrors($validator)->withInput();
        }
            $user = auth('company')->user();

            $product = new Product();
            $product->name = $req->name;
            $product->description = $req->description;
            $product->price = $req->price;
            $product->company_id = $user->id;

            if ($req->hasFile('image')) {
                $imageName = time() . '-' . $req->file('image')->getClientOriginalName();
                $req->file('image')->move(public_path('products'), $imageName);
                $product->image = $imageName;
            }
        

            $product->save();

            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Product created successfully.',
                    'status' => 'success',
                    'product' => $product,
                    'code' => 201,
                ]);
            }
        return redirect()->route('company.products')->with('message', 'Product created successfully.');
    }
    public function edit($id, Request $req){
        $product = Product::find($id);
            if(!$product){
                if($req->wantsJson()){
                    return response()->json([
                        'message' => 'Product not found.',
                        'status' => 'error',
                        'code' => 404,
                    ]); 
                }
                return redirect()->route('company.products')->with('message', 'Product not found.');
            }
            if($req->wantsJson()){
                return response()->json([
                    'products' => $product,
                    'message' => 'Product found.',
                    'status' => 'success',
                    'code' => 200,
                ]);
            }
            return Inertia::render('Product/Edit',[
                'product' => $product,
                'message' => 'Product found.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        public function update(Request $req, $id)
        {
            $product = Product::find($id);
            if (!$product) {
                if ($req->wantsJson()) {
                    return response()->json([
                        'message' => 'Product not found.',
                        'status' => 'error',
                        'code' => 404,
                    ]);
                }
                return redirect()->route('company.products')->with('message', 'Product not found.');
            }
        
            $validator = Validator::make($req->all(), [
                'name' => 'nullable|string|max:50',
                'description' => 'nullable|string|max:500',
                'price' => 'nullable|numeric',
                'image' => 'nullable|image|mimes:jpg,png,jpeg',
            ]);
        
            if ($validator->fails()) {
                if ($req->wantsJson()) {
                    return response()->json([
                        'message' => 'Validation Error.',
                        'errors' => $validator->errors(),
                        'status' => 'error',
                        'code' => 422,
                    ]);
                }
                return back()->withErrors($validator)->withInput();
            }
        
            $product->name = $req->name ?? $product->name;
            $product->description = $req->description ?? $product->description;
            $product->price = $req->price ?? $product->price;
        
            if ($req->hasFile('image')) {
                if ($product->image && file_exists(public_path('products/' . $product->image))) {
                    unlink(public_path('products/' . $product->image));
                }
        
                $imageName = time() . '-' . $req->file('image')->getClientOriginalName();
                $req->file('image')->move(public_path('products'), $imageName);
                $product->image = $imageName;
            }
        
            $product->save();
        
            if ($req->wantsJson()) {
                return response()->json([
                    'message' => 'Product Updated Successfully.',
                    'status' => 'success',
                    'code' => 200,
                    'product' => $product,
                ]);
            }
        
            return redirect()->route('company.products')->with('message', 'Product Updated Successfully.');
        }
    public function destroy($id, Request $req){
        $product = Product::find($id);
        if(!$product){
            if($req->wantsJson()){
                return response()->json([
                    'message' => 'Product not Found.',
                    'status' => 'error',
                    'code' => 404,
                ]);
            }
            return redirect()->route('company.products')->with('message', 'Product not Found.');
        }
        $product->delete();
        if($req->wantsJson()){
            return response()->json([
                'message' => 'Product Deleted Successfully.',
                'status' => 'success',
                'code' => 200,
            ]);
        }
        return redirect()->route('company.products')->with('message', 'Product Delete Successfully.');
    }
    public function home(Request $req)
    {
        $user = auth('company')->user();
        $products = Product::where('company_id', $user->id)->get();

        return Inertia::render('Product/Home', [
            'products' => $products,
            'message' => 'Product Dashboard',
            'status' => 'success',
        ]);
    }
    public function control(Request $req)
    {
        return Inertia::render('Product/Control', [
            'message' => 'Product Control',
            'status' => 'success',
        ]);
    }
}
