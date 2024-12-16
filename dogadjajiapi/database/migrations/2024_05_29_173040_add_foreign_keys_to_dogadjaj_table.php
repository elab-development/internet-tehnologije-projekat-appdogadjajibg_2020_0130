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
        Schema::table('dogadjajs', function (Blueprint $table) {
            $table->foreign('mesto_id')->references('id')->on('mestos')->onDelete('cascade');
            $table->foreign('kategorija_id')->references('id')->on('kategorijas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dogadjajs', function (Blueprint $table) {
            $table->dropForeign(['mesto_id']);
            $table->dropForeign(['kategorija_id']);
        });
    }
};
