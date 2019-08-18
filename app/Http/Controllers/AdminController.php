<?php

namespace App\Http\Controllers;


use App\Cards;
use App\Greeting;
use App\Tutorial;
use App\Videos;
use http\Cookie;
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
    public function uploadTutorial(Request $request) {
        $name = 'tutorial'.time() . '.' . explode('/', explode(':', substr($request->tutorial, 0, strpos($request->tutorial, ';')))[1])[1];
        $video = file_get_contents($request->tutorial);

        $files = Storage::allFiles('/public/tutorial');
        Storage::delete($files);
        DB::table('tutorial')->delete();
        Storage::disk('public')->put("tutorial/".$name, $video);

        $tutorial = new Tutorial();
        $tutorial->path = "/storage/tutorial/".$name;
        $tutorial->save();
        return response(['upload' => 'yes']);
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
        $greeting = DB::table('greetings')->where('id', $request->index)->delete();
        return response(['id'=>$request->index]);
    }
    public function deleteCard(Request $request) {
        $card = DB::table('cards')->where('id', $request->index)->delete();
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
}
