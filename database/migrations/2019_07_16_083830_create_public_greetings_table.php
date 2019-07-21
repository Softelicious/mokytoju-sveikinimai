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
            $table->integer('greeting');
            $table->integer('card');
            $table->string('school');
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
