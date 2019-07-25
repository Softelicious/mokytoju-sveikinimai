<?php

namespace App\Http\Controllers;


use App\Cards;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class AdminController extends Controller
{

    public function index(){
        return response(['foto' => 'storage/1.jpg']);
    }
    public function getCards(){
        $files = Storage::files("cards");
        return response()->json($files);
    }
    public function uploadCards(Request $request){
//        for($i = 0; $i<$request->index; $i++){
//            $path = $request->file($i)->store('cards');
//            $card = new Cards();
//            $card->path = $path;
//            $card->save();
//        }
        //$path = $request->file($request[0])->store('cards');
       // Storage::disk('local')->put('file.txt', 'Contents');
//        $path = $request->file('card')->store('cards');
//        $path = $request->file('card')->storeAs(
//            'cards', $request->user()->id
//        );
        if($file = $request->file("file0")){
            return response(['images'=> true, 'file' => $file]);
        }else{
            return response(['images'=> false]);
        }


    }
    public function store(Request $request)
    {
        if($request->get('file'))
        {
            $image = $request->get('file');
            $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
            //\Image::make($request->get('file'))->save(public_path('images/').$name);
        }



        $fileupload = new Fileupload();
        $fileupload->filename=$name;
        $fileupload->save();
        return response()->json('Successfully added');

    }

}
