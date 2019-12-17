<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $guarded = [];

    public function privateGreetings(){
        return $this->hasMany(PrivateGreeting::class);
    }
}
