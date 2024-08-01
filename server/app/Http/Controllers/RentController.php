<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rent;

class RentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Rent::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required',
            'book_id' => 'required',
            'price' => 'required',
            'rent_date' => 'required',
        ]);

         $rent = Rent::create($request->all());

         return response()->json($rent, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Rent::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'customer_id' => 'required',
            'book_id' => 'required',
            'price' => 'required',
            'rent_date' => 'required',
        ]);

        $rent = Rent::find($id);

        $rent->update($request->all());

        return response()->json($rent, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Rent::find($id)->delete();

        return response()->json(null, 204);
    }
}
