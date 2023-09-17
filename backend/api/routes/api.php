<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CarpetaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/auth/register', [UserController::class, 'registerUser']);
Route::post('/auth/login', [UserController::class, 'loginUser']);




// Estas rutas necesitan Token de acceso para ser usadas
Route::middleware(['auth:sanctum'])->group(function () {
    //Logout
    Route::get('/auth/logout', [UserController::class, 'logoutUser']);

    // CarpetaController
    Route::get('/carpeta/index', 'App\Http\Controllers\Api\CarpetaController@index');
    Route::post('/carpeta/store', 'App\Http\Controllers\Api\CarpetaController@store');
    Route::get('/carpeta/edit/{id}', 'App\Http\Controllers\Api\CarpetaController@edit');
    // el update soloo funciona si le paso los datos en un JSON
    Route::put('/carpeta/update/{id}', 'App\Http\Controllers\Api\CarpetaController@update');
    Route::delete('/carpeta/delete/{id}', 'App\Http\Controllers\Api\CarpetaController@destroy');
});
