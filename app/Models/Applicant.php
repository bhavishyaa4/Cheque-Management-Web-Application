<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Applicant extends Authenticatable
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

    //This one for the company
    public function company(){
        return $this->belongsTo(Company::class);
    }

    //This one for the cheques
    public function cheques(){
        return $this->hasMany(Cheque::class);
    }
}
