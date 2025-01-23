<?php

namespace App\Rules;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Validation\ValidationRule;

class UniqueAccountNumber implements ValidationRule
{
    protected $applicantId;

    public function __construct($applicantId)
    {
        $this->applicantId = $applicantId;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, \Illuminate\Translation\PotentiallyTranslatedString): void  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $exists = DB::table('cheques')
            ->where('account_number', $value)
            ->where('applicant_id', '!=', $this->applicantId)
            ->exists();

        if ($exists) {
            $fail('The account number is already in use by another user.');
        }
    }
}
