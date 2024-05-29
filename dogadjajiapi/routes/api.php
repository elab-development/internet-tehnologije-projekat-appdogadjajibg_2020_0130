<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    
});

Route::middleware(['auth:sanctum','role:korisnik'])->group(function () {
     
});
Route::middleware(['auth:sanctum','role:admin,korisnik'])->group(function () {
     
});