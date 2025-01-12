<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
    ];

    protected $hidden = [
        'password',
    ];

    //This one for applicants
    public function applicants(){
        return $this->hasMany(Applicant::class);
    }

    //This one for products
    public function products(){
        return $this->hasMany(Product::class);
    }

    //This one for Employees
    public function employees(){
        return $this->hasMany(Employee::class);
    }

}

//I have written this myself okay not chatgpt....