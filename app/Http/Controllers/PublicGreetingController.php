<?php

namespace App\Http\Controllers;

use App\PublicGreetings;
use App\PublicUniqueGreetings;
use http\Env\Response;
use Illuminate\Http\Request;

class PublicGreetingController extends Controller
{
    public function store(Request $request){
        $greeting = new PublicGreetings();
        $greeting->teacher = $request->teacher;
        $greeting->student = $request->student;
        $greeting->greeting = $request->greeting;
        $greeting->card = $request->card;
        $greeting->save();
        return Response()->json($greeting);
    }
    public function storeUnique(Request $request){
        $greeting = new PublicUniqueGreetings();
        $greeting->teacher = $request->teacher;
        $greeting->student = $request->student;
        $greeting->greeting = $request->greeting;
        $greeting->card = $request->card;
        $greeting->save();
        return Response()->json($greeting);
    }
}
