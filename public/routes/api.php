<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('tracks', [App\Http\Controllers\TracksController::class, 'tracks']);
Route::get('getTrack/{id}', [App\Http\Controllers\TracksController::class, 'getTrack']);
Route::post('saveTrack', [App\Http\Controllers\TracksController::class, 'saveTrack']);
Route::delete('deleteTrack/{id}', [App\Http\Controllers\TracksController::class, 'deleteTrack']);
Route::post('updateTrack/{id}', [App\Http\Controllers\TracksController::class, 'updateTrack']);