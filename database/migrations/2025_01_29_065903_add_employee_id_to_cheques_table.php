<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cheques', function (Blueprint $table) {
            // Adding foreign key to 'employee_id'
            $table->foreignId('employee_id')->nullable()->constrained('employees')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cheques', function (Blueprint $table) {
            // Dropping foreign key for 'employee_id' column if it exists
            $table->dropForeign(['employee_id']);
            $table->dropColumn('employee_id');
        });
    }
};
