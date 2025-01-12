<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cheque extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'applicant_id',
        'product_id',
        'amount',
        'bank_details',
        'collected_date',
        'status',
    ];

    //This one is for applicants
    public function applicant(){
        return $this->belongsTo(Applicant::class);
    }

    //This one is for products
    public function product(){
        return $this->belongsTo(Product::class);
    }
}
