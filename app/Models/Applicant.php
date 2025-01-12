<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'company_id',
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
