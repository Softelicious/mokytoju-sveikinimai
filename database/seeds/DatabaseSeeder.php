<?php

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('vids')->insert([
            'video' => '/assets/vaikas.mp4',
            'thumblain' => '/assets/book.jpg',
            'name' => Str::random(10) . '@gmail.com',
            'description' => Str::random(50),
            'index' => 1
        ]);
        DB::table('vids')->insert([
            'video' => '/assets/vaikas.mp4',
            'thumblain' => '/assets/apple.jpg',
            'name' => Str::random(10) . '@gmail.com',
            'description' => Str::random(50),
            'index' => 2
        ]);
        DB::table('vids')->insert([
            'video' => '/assets/vaikas.mp4',
            'thumblain' => '/assets/camera.jpg',
            'name' => Str::random(10) . '@gmail.com',
            'description' => Str::random(50),
            'index' => 3
        ]);
        DB::table('vids')->insert([
            'video' => '/assets/vaikas.mp4',
            'thumblain' => '/assets/class.jpg',
            'name' => Str::random(10) . '@gmail.com',
            'description' => Str::random(50),
            'index' => 4
        ]);
    }
}
