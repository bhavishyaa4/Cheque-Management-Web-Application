<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Authenticatable
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
    //This one is to indentify cheques of that company
        public function cheques()
        {
            return $this->hasMany(Cheque::class);
        }
}
