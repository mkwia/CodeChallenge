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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('comments/az', "Api\CommentsController@showByAlphabetical");
Route::get('comments/za', "Api\CommentsController@showByReverseAlphabetical");
Route::get('comments/new', "Api\CommentsController@showByNew");
Route::get('comments/old', "Api\CommentsController@showByOld");

Route::get('comments/author/{name}', "Api\CommentsController@showByAuthor");

Route::put('approve', "Api\CommentsController@approve");