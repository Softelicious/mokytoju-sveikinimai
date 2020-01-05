<?php

use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teachers')->insert([
            'name' => 'Tomas Tomauskas',
            'school' => 'tttttt mokykla',
            'email' => Str::random(10) . '@gmail.com',
        ]);
        DB::table('teachers')->insert([
            'name' => 'Lukas Tomauskas',
            'school' => 'trecia mokykla',
            'email' => Str::random(10) . '@gmail.com',
        ]);
        DB::table('teachers')->insert([
            'name' => 'Rasa Tomauskas',
            'school' => 'antra mokykla',
            'email' => Str::random(10) . '@gmail.com',
        ]);
        DB::table('teachers')->insert([
            'name' => 'Dziugas Tomauskas',
            'school' => 'viena mokykla',
            'email' => Str::random(10) . '@gmail.com',
        ]);
    }
}
