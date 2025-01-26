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
        Schema::create('cheques', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')->constrained();
            $table->foreignId('product_id')->constrained();
            $table->decimal('amount', 10, 2);
            $table->string('bank_name'); 
            $table->string('bearer_name');  
            $table->string('account_number');
            $table->date('collected_date');
            $table->string('location');
            $table->string('number');
            $table->enum('status', ['pending', 'hold', 'cancelled', 'ok'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cheques');
    }
};
