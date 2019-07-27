<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/store', 'PublicGreetingController@store');
Route::get('/get', 'PublicGreetingController@get');

Route::post('/register', 'AuthenticateController@register');
Route::post('/login', 'AuthenticateController@login');
Route::get('/check', 'AuthenticateController@check');

Route::middleware('auth:api')->group(function (){
    Route::get('/admin/getCards', 'AdminController@getCards');
    Route::get('/admin/getGreetings', 'AdminController@getGreetings');
    Route::post('/admin/uploadCards', 'AdminController@uploadCards');
    Route::post('/admin/uploadGreetings', 'AdminController@uploadGreetings');
});

