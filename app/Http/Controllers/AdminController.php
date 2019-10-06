<?php

namespace App\Http\Controllers;


use App\Cards;
use App\Greeting;
use App\Tutorial;
use App\Vid;
use App\Videos;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as Image;


class AdminController extends Controller
{
    public function check(){
        $check= Auth::check();
        return response(['auth' => $check]);
    }
    public function uploadCards(Request $request) {
        $sk =0;
        $arr = [];
        if ($files = $request->index) {
            for($i = 0; $i<$request->index; $i++){
                $name = time() . '.' . explode('/', explode(':', substr($request["file".$i], 0, strpos($request["file".$i], ';')))[1])[1];
                Image::make($request["file".$i])->save(public_path('storage/') . "card_index".$i.$name);
                array_push($arr, "card_index".$i.$name);
                $sk++;

                $card = new Cards();
                $card->path = Storage::url("card_index".$i.$name);
                $card->save();
            }
            return response(['upload' => 'success', 'sk'=>$arr]);
        }
        return response(['upload' => 'error no files ']);
    }
    public function uploadVideos(Request $request) {
        $sk =0;
        $arr = [];
        if ($files = $request->index) {
            for($i = 0; $i<$request->index; $i++){
                $name = time() . '.' . explode('/', explode(':', substr($request["file".$i], 0, strpos($request["file".$i], ';')))[1])[1];
                $video = file_get_contents($request["file".$i]);
                Storage::disk('public')->put("videos/video".$i.$name, $video);
                array_push($arr, "video".$i.$name);
                $sk++;

                $video = new Videos();
                $video->path = Storage::url("videos/video".$i.$name);
                $video->save();
            }
            return response(['upload' => 'success', 'sk'=>$arr]);
        }
        return response(['upload' => 'error no files ']);
    }
    public function updateTutorial(Request $request) {
        $name = 'tutorial'.time() . '.' . explode('/', explode(':', substr($request->video, 0, strpos($request->video, ';')))[1])[1];
        $video = file_get_contents($request->video);

        Storage::disk('public')->put("tutorial/".$name, $video);
        $productImage = str_replace('/storage', '', Tutorial::first()->video);
        Storage::disk('public')->delete($productImage);

        Tutorial::first()->update(['video' =>  "/storage/tutorial/".$name]);


        return response(['upload' => "true"]);
    }
    public function updateTutorialThumblain(Request $request) {
        $name = 'tutorialThumblain'.time() . '.' . explode('/', explode(':', substr($request->thumblain, 0, strpos($request->thumblain, ';')))[1])[1];
        $thumblain = file_get_contents($request->thumblain);

        Storage::disk('public')->put("tutorial/".$name, $thumblain);
        $productImage = str_replace('/storage', '', Tutorial::first()->thumblain);
        Storage::disk('public')->delete($productImage);

        Tutorial::first()->update(['thumblain' =>  "/storage/tutorial/".$name]);


        return response(['upload' => "true"]);
    }
    public function updateTutorialDescriptionAndName(Request $request){
        Tutorial::first()->update(['name' => $request->name, 'description' => $request->description]);;
        return response([]);
    }

    public function uploadGreeting(Request $request) {
        $greeting = new Greeting();
        $greeting->greeting = $request->text;
        $greeting->save();
        return response()->json($greeting);
    }
    public function updateGreeting(Request $request) {
        $greeting = DB::table('greetings')->where('id', $request->index)->update(['greeting' => $request->text]);;
        return response()->json($greeting);
    }

    public function deleteGreeting(Request $request) {
        DB::table('greetings')->where('id', $request->index)->delete();
        return response(['id'=>$request->index]);
    }
    public function deleteCard(Request $request) {
        DB::table('cards')->where('id', $request->index)->delete();
        $productImage = str_replace('/storage', '', $request->name);
        Storage::delete('/public' . $productImage);
        return response(['id'=>$request->index]);
    }
    public function deleteVideo(Request $request) {
        $vid = DB::table('videos')->where('id', $request->index)->delete();
        $productImage = str_replace('/storage', '', $request->name);
        Storage::delete('/public' . $productImage);
        return response(['id'=>$request->index]);
    }

    public function logout()
    {
        if (Auth::check()) {
//            DB::table('oauth_access_tokens')
//                ->where('user_id', Auth::user()->id)
//                ->update([
//                    'revoked' => true
//                ]);
            try {
                DB::table('oauth_access_tokens')
                ->where('user_id', Auth::user()->id)
                ->update([
                    'revoked' => true
                ]);

            } catch (\Exception $e) {

                return response(['logout'=>true, 'check' => Auth::check(), 'check2' => $e->getMessage()]);
            }

            return response(['logout'=>true, 'check' => Auth::check(), 'check2' => auth()->check()]);
        }

        return response(['logout'=>false, 'check' => Auth::check(), 'check2' => auth()->check()]);
    }

    public function deletePublicGreeting(Request $request){
        DB::table('public_greetings')->where('id', $request->index)->delete();
        return response(['sc' => true]);
    }
    public function vids(){
        $vids = Vid::all();
        return Response()->json($vids);
    }
    public function updateDescriptionAndName(Request $request){
        $vid = DB::table('vids')->where('id', $request->index)->update(['name' => $request->name, 'description' => $request->description]);;
        return response()->json($vid);
    }
    public function updateVideo(Request $request){
        $name = 'vid'.time() . '.' . explode('/', explode(':', substr($request['video'], 0, strpos($request['video'], ';')))[1])[1];
        $video = file_get_contents($request['video']);
        Storage::disk('public')->put("promo/".$name, $video);
        $productImage = str_replace('/storage', '', Vid::find($request['index'])->video);
        Storage::disk('public')->delete($productImage);
        DB::table('vids')->where('id', $request['index'])->update(['video' => Storage::url('promo/'.$name)]);;
        return response(["t" => $name]);
    }
    public function updateThumblain(Request $request){
        $name = 'thumb'.time() . '.' . explode('/', explode(':', substr($request['thumblain'], 0, strpos($request['thumblain'], ';')))[1])[1];
        Image::make($request["thumblain"])->save(public_path('storage/promo/') . $name);
        $productImage = str_replace('/storage', '', Vid::find($request['index'])->thumblain);
        Storage::disk('public')->delete($productImage);
        DB::table('vids')->where('id', $request['index'])->update(['thumblain' => Storage::url('promo/'.$name)]);;
        return response(["t" => $name]);

    }
}
