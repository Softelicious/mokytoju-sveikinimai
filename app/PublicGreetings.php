<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PublicGreetings extends Model
{
    protected $table = 'public_greetings';
    protected $fillable = ['teacher', 'student', 'greeting', 'card_index', 'school', 'picture'];
}
