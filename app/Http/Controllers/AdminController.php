<?php

namespace App\Http\Controllers;


use App\Cards;
use App\Greeting;
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
}
