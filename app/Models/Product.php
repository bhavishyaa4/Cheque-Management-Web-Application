<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'company_id',
    ];

    //This one is for related company
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    //This one is for cheque
    public function cheque()
    {
        return $this->hasMany(Cheque::class);
    }
}
