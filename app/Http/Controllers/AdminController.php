<?php

namespace App\Http\Controllers;


use App\Cards;
use App\Greeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as Image;


class AdminController extends Controller
{
    public function getCards(){
        $names = [];
        $sk = 0;
        $cards = Cards::all();
        foreach ($cards as $card){
            array_push($names, Storage::url($card->path));
            $sk++;
        }
        return response(['sk' =>$sk, 'cards' => $cards, 'names'=>$names]);
    }
    public function getGreetings(){
        $greetings = Greeting::all();
        return response()->json($greetings);
    }


    public function uploadCards(Request $request) {
        $sk =0;
        $arr = [];
        if ($files = $request->index) {
            for($i = 0; $i<$request->index; $i++){
                $name = time() . '.' . explode('/', explode(':', substr($request["file".$i], 0, strpos($request["file".$i], ';')))[1])[1];
                //Storage::disk('public')->put("card".$i.$name, Image::make($request["file".$i]));
                Image::make($request["file".$i])->save(public_path('storage/') . "card".$i.$name);
                array_push($arr, "card".$i.$name);
                $sk++;

                $card = new Cards();
                $card->path = Storage::url("card".$i.$name);
                $card->save();
            }
            return response(['upload' => 'success', 'sk'=>$arr]);
        }
        return response(['upload' => 'error no files ']);
    }
    public function uploadGreetings(Request $request) {

                $greeting = new Greeting();
                $greeting->greeting = $request->text;
                $greeting->save();

        return response()->json($greeting);
    }
}
