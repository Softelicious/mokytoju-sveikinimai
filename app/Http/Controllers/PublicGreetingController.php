<?php

namespace App\Http\Controllers;

use App\PublicGreetings;
use App\PublicUniqueGreetings;
use Illuminate\Http\Request;

class PublicGreetingController extends Controller
{
    public function store(Request $request){
        $greeting = new PublicGreetings();
        $greeting->teacher = $request->teacher;
        $greeting->student = $request->student;
        $greeting->greeting = $request->greeting;
        $greeting->card = $request->card;
        $greeting->school = $request->school;
        $greeting->save();
        return Response()->json($greeting);
    }
    public function storeUnique(Request $request){
        $greeting = new PublicUniqueGreetings();
        $greeting->teacher = $request->teacher;
        $greeting->student = $request->student;
        $greeting->greeting = $request->greeting;
        $greeting->card = $request->card;
        $greeting->school = $request->school;
        $greeting->save();
        return Response()->json($greeting);
    }
    public function get(){
        $greeting = PublicGreetings::all();
        return Response()->json($greeting);
    }
    public function getUnique(){
        $greeting = PublicGreetings::all();
        return Response()->json($greeting);
    }
}
