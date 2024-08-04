<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookTransaction;

class BookTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
    $page = $request->input('page');
    $limit = $request->input('limit');
    $sort = $request->input('sort', 'desc');

    $query = BookTransaction::orderBy('id', $sort);

    if ($page && $limit) {
        $transactions = $query
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();
    } else {
        $transactions = $query->get();
    }

    return response()->json($transactions);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'book_id' => 'required|exists:books,id',
            'price' => 'required|numeric',
            'rent_date' => 'required|date',
            'return_date' => 'nullable|date',
            'is_returned' => 'nullable|boolean',
        ]);

        $bookTransaction = BookTransaction::create($request->all());

        return response()->json($bookTransaction, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return BookTransaction::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'book_id' => 'required|exists:books,id',
            'price' => 'required|numeric',
            'rent_date' => 'required|date',
            'return_date' => 'nullable|date',
            'is_returned' => 'nullable|boolean',
        ]);

        $bookTransaction = BookTransaction::find($id);

        $bookTransaction->update($request->all());

        return response()->json($bookTransaction, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        BookTransaction::find($id)->delete();

        return response()->json(null, 204);
    }
}
