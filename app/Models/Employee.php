<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'company_id',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    //This one is to identify company employee:
        public function company(){
            return $this->belongsTo(Company::class);
        }
}
