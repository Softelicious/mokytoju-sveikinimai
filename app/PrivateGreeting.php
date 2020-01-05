<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PrivateGreeting extends Model
{
    protected $guarded = [];
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
