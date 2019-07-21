<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PublicUniqueGreetings extends Model
{
    protected $table = 'public_unique_greetings';
    protected $fillable = ['teacher', 'student', 'greeting', 'card', 'school'];
}
