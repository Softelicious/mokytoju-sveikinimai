<?php

namespace App\Http\Controllers;

use App\Cards;
use App\Greeting;
use App\PinnedPhoto;
use App\PrivateGreeting;
use App\PublicGreetings;
use App\Tutorial;
use App\Vid;
use App\Videos;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as Image;
use Psy\Util\Json;
use Psy\Util\Str;

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
    public function storePrivate(Request $request){
        $secretKey = "6Lf2ibMUAAAAAO79wNvqLChxrks3xRgAc08FvfHt";
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret='. $secretKey .  '&response=' . $request->captcha;
        $response = file_get_contents($url);
        $responseKeys = json_decode($response,true);
        $teachers = json_decode($request->teachers);

        if($responseKeys["success"]){
            $sk =0;
            $upload_id = rand( 1, 10000);
            for($i = 0; $i<$request->index; $i++){
                $name = time() . '.' . explode('/', explode(':', substr($request["file".$i], 0, strpos($request["file".$i], ';')))[1])[1];
                Image::make($request["file".$i])->save(public_path('storage/pinned-images/') . "photo".$i.$name);
                $sk++;

                $photo = new PinnedPhoto();
                $photo->path = Storage::url("pinned-images/photo".$i.$name);
                $photo->upload_id = $upload_id;
                $photo->save();
            }
            foreach ($teachers as $teacher){
                $greeting = new PrivateGreeting();
                $greeting->teacher_id = $teacher->id;
                $greeting->student = $request->student;
                $greeting->greeting = $request->greeting;
                $greeting->card_index = $request->card;
                $greeting->picture = $request->picture;
                $greeting->upload_id = $upload_id;
                $greeting->save();
            }
            return Response(['success' =>true, 'info' => $teachers]);
        }else{
            return Response(['success' =>false, 'info' => $request->captcha]);
        }
    }
    public function get(){
        $greeting = PublicGreetings::all();
        return Response()->json($greeting);
//        return Response(['key' =>'value']);
    }
}
