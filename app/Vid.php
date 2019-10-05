<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vid extends Model
{
    protected $table = 'vids';
    protected $fillable = ['video', 'thumblain', 'name', 'description', 'index'];
}
