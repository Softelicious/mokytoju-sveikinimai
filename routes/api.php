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


Route::get('/getCards', 'PublicGreetingController@getCards');
Route::get('/getGreetings', 'PublicGreetingController@getGreetings');

Route::get('/getTutorial', 'PublicGreetingController@getTutorial');
Route::get('/getVideos', 'PublicGreetingController@getVideos');

Route::middleware('auth:api')->group(function (){
    Route::post('/admin/uploadTutorial', 'AdminController@uploadTutorial');
    Route::post('/admin/uploadVideos', 'AdminController@uploadVideos');
    Route::post('/admin/uploadCards', 'AdminController@uploadCards');
    Route::post('/admin/deleteCard', 'AdminController@deleteCard');
    Route::post('/admin/uploadGreeting', 'AdminController@uploadGreeting');
    Route::post('/admin/updateGreeting', 'AdminController@updateGreeting');
    Route::post('/admin/deleteGreeting', 'AdminController@deleteGreeting');
    Route::post('/admin/deleteVideo', 'AdminController@deleteVideo');
    Route::get('/admin/logout','AdminController@logout');
    Route::get('/admin/check', 'AdminController@check');
});

