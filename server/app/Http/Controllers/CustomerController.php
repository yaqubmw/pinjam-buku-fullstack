<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Customer::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'membership_number' => 'required|unique:customers',
            'name' => 'required',
            'birth_date' => 'required|date',
        ]);

         $customer = Customer::create($request->all());

         return response()->json($customer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Customer::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'membership_number' => 'required|unique:customers,membership_number,' . $id,
            'name' => 'required',
            'birth_date' => 'required|date',
        ]);

        $customer = Customer::find($id);

        $customer->update($request->all());

        return response()->json($customer, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Customer::find($id)->delete();

        return response()->json(null, 204);
    }
}
