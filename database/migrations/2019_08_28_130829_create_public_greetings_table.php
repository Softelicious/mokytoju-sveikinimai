<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePublicGreetingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('public_greetings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('teacher');
            $table->string('student');
            $table->longText('greeting');
            $table->string('card_index');
            $table->string('school');
            $table->string('picture');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('public_greetings');
    }
}
