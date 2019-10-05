<?php

use App\Tutorial;
use Illuminate\Database\Seeder;

class TutorialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tutorial = new Tutorial();
        $tutorial->video = '/assets/vaikas.mp4';
        $tutorial->thumblain = '/assets/book.jpg';
        $tutorial->description = 'Pamokos aprašymas';
        $tutorial->name = 'Pamokos pavadinimas';
        $tutorial->save();
    }
}
