<?php

namespace App\Http\Controllers;

use App\Data;
use Illuminate\Http\Request;

class ReactController extends Controller
{
    public function get(){
        $all = Data::all();
        return response()->json($all);
    }
    public function post(Request $request){
        $data = new Data();
        $data->name = $request->name;
        $data->save();
        return response()->json($data);
    }
    public function put($id){

    }
    public function delete($id){

    }

}
