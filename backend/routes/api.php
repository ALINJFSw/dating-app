<?php

use App\Http\Controllers\FavoritController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlockController;
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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('get-users', 'getUsers');
    Route::post('update-user', 'updateUser');
    Route::post('get-user', 'getRuningUser');
    Route::post('get-user-by-id', 'getUserById');


});

Route::post('/add-to-favorite',[FavoritController::class, "addToFavorite"]);
Route::post('/block',[blockController::class, "block"]);
Route::post('/send-message',[MessageController::class, "sendMessage"]);
Route::post('/get-messages',[MessageController::class, "getMessages"]);
Route::post('/get-notifications',[NotificationController::class, "getNotifications"]);

