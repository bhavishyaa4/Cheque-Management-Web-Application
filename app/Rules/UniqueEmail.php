<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class UniqueEmail implements ValidationRule
{

    protected $applicantId;
    protected $companyId;

    public function __construct($applicantId, $companyId)
    {
        $this->applicantId = $applicantId;
        $this->companyId = $companyId;

    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        $exists = DB::table('applicants')
        ->where('email',$value)
        ->where('company_id', $this->companyId)
        ->where('id', '!=', $this->applicantId)
        ->exists();
        if($exists){
            $fail('The email has already been taken in this company.');
        }
    }
}
