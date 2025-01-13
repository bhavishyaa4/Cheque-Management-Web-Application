<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Company extends Authenticatable
{
    //
    use HasFactory;
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'password',
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