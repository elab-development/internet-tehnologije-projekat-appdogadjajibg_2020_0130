<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\KategorijaController;
use App\Http\Controllers\MestoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DogadjajController;
use App\Http\Controllers\UlogaController;

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


//NEZASTICENE RUTE
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
  
Route::get('/kategorije', [KategorijaController::class, 'index']);


Route::get('/mesta', [MestoController::class, 'index']);




Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/dogadjaji', [DogadjajController::class, 'store']);
    Route::put('/dogadjaji/{id}', [DogadjajController::class, 'update']);
    Route::delete('/dogadjaji/{id}', [DogadjajController::class, 'destroy']);

    Route::post('/mesta', [MestoController::class, 'store']);
    Route::delete('/mesta/{id}', [MestoController::class, 'destroy']);


    Route::post('/kategorije', [KategorijaController::class, 'store']);
    Route::delete('/kategorije/{id}', [KategorijaController::class, 'destroy']);

    Route::apiResource('uloge', UlogaController::class);
});

Route::middleware(['auth:sanctum','role:korisnik'])->group(function () {
    Route::get('/dogadjaji/search', [DogadjajController::class, 'search']); 
    Route::get('/dogadjaji', [DogadjajController::class, 'index']);
    Route::get('/dogadjaji/{id}', [DogadjajController::class, 'show']);
});
Route::middleware(['auth:sanctum','role:admin,korisnik'])->group(function () {
     
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('myProfile', [AuthController::class, 'myProfile']);
});