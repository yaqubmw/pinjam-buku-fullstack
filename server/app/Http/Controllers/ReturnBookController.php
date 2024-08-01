<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReturnBook;

class ReturnBookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ReturnBook::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required',
            'book_id' => 'required',
            'return_date' => 'required',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return ReturnBook::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'customer_id' => 'required',
            'book_id' => 'required',
            'return_date' => 'required',
        ]);

        $returnBook = ReturnBook::find($id);

        $returnBook->update($request->all());

        return response()->json($returnBook, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        ReturnBook::find($id)->delete();

        return response()->json(null, 204);
    }
}
