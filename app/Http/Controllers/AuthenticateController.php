<?php

namespace App\Http\Controllers;

use App\Http\LoginProxy;
use App\Http\LoginRequest;
use App\PublicGreetings;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

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

       $a = auth()->attempt($loginData, true);
        if(!$a) {
            return response(['message'=>$a, 'auth' => false]);
       }
        $accessToken = auth()->user()->createToken('authToken')->accessToken;
        return response(['user' => auth()->user(), 'access_token' => $accessToken, 'auth' => true, "attempt" => $a, "auth()" => auth()]);
    }


}




