<?php

use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/login', [Auth\LoginController::class, 'index'])->name('auth.login');
Route::post('/login', [Auth\LoginController::class, 'authenticate']);

Route::get('/login/callback', [Auth\LoginController::class, 'callback']);
