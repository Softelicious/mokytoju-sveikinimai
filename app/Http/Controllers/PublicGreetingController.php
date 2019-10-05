<?php

namespace App\Http\Controllers;

use App\Cards;
use App\Greeting;
use App\PublicGreetings;
use App\Tutorial;
use App\Vid;
use App\Videos;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PublicGreetingController extends Controller
{

    public function getCards(){
        $names = [];
        $sk = 0;
        $cards = Cards::all();
        foreach ($cards as $card){
            array_push($names, $card->path);
            $sk++;
        }
        return response(['sk' =>$sk, 'cards' => $cards, 'names'=>$names]);
    }
    public function getTutorial(){
        $tutorial = Tutorial::all();
        return response(['tutorial'=>$tutorial]);
    }
    public function getVideos(){
        $vids = Vid::all();
        return Response()->json($vids);
    }
    public function getGreetings(){
        $sk = 0;
        $names = [];
        $greetings = Greeting::all();
        foreach ($greetings as $g){
            array_push($names, $g->greeting);
            $sk++;
        }
        return response(['sk' =>$sk, 'greetings' => $greetings, 'names'=>$names]);

    }
    public function recaptcha(Request $request){
        $secretKey = "6Lf2ibMUAAAAAO79wNvqLChxrks3xRgAc08FvfHt";
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret='. $secretKey .  '&response=' . $request->captcha;
        $response = file_get_contents($url);
        $responseKeys = json_decode($response,true);
        return response(['success' => $responseKeys["success"]]);
    }
    public function store(Request $request){
        $secretKey = "6Lf2ibMUAAAAAO79wNvqLChxrks3xRgAc08FvfHt";
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret='. $secretKey .  '&response=' . $request->captcha;
        $response = file_get_contents($url);
        $responseKeys = json_decode($response,true);
        if($responseKeys["success"]){
            $greeting = new PublicGreetings();
            $greeting->teacher = $request->teacher;
            $greeting->student = $request->student;
            $greeting->greeting = $request->greeting;
            $greeting->card_index = $request->card;
            $greeting->school = $request->school;
            $greeting->picture = $request->picture;
            $greeting->save();
            return Response(['success' =>true]);
        }else{
            return Response(['success' =>false]);
        }

    }
    public function get(){
        $greeting = PublicGreetings::all();
        return Response()->json($greeting);
//        return Response(['key' =>'value']);
    }
}
