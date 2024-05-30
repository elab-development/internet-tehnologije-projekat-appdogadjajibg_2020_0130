<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\KategorijaController;
use App\Http\Controllers\MestoController;
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

Route::get('/kategorije', [KategorijaController::class, 'index']);
Route::post('/kategorije', [KategorijaController::class, 'store']);
Route::delete('/kategorije/{id}', [KategorijaController::class, 'destroy']);

Route::get('/mesta', [MestoController::class, 'index']);
Route::post('/mesta', [MestoController::class, 'store']);
Route::delete('/mesta/{id}', [MestoController::class, 'destroy']);


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    
});

Route::middleware(['auth:sanctum','role:korisnik'])->group(function () {
     
});
Route::middleware(['auth:sanctum','role:admin,korisnik'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('myProfile', [AuthController::class, 'myProfile']);
});