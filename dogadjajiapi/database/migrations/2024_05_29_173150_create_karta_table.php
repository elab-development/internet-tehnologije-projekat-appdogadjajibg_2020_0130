<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('karta', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('dogadjaj_id');
            $table->decimal('cena', 8, 2);
            $table->string('status')->default('rezervisana');
            $table->timestamps();

            // Spoljni ključevi
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('dogadjaj_id')->references('id')->on('dogadjajs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('karta', function (Blueprint $table) {
            // Uklanjanje spoljnih ključeva
            $table->dropForeign(['user_id']);
            $table->dropForeign(['dogadjaj_id']);
        });

        Schema::dropIfExists('karta');
    }
};
