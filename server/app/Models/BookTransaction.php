<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookTransaction extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'book_id', 'price', 'rent_date', 'return_date', 'is_returned'];
}
