<?php

namespace App\Http\Controllers;

use App\PublicGreetings;
use Illuminate\Http\Request;
use App\User;

class AuthenticateController extends Controller
{
    public function register(Request $request){
        $validatedData = $request->validate([
            'name' => 'required|max:55|unique:users',
            'password' => 'required'
        ]);
        $validatedData['password'] = bcrypt($request->password);
        $user = User::create($validatedData);
        $accessToken = $user->createToken('authToken')->accessToken;

        return response()->json(["user" => $user, "token" => $accessToken]);

    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'name' => 'required',
            'password' => 'required'
        ]);

        if(!auth()->attempt($loginData)) {
            return response(['message'=>'Invalid credentials']);
        }
        $accessToken = auth()->user()->createToken('authToken')->accessToken;
        return response(['user' => auth()->user(), 'access_token' => $accessToken]);
    }

}




