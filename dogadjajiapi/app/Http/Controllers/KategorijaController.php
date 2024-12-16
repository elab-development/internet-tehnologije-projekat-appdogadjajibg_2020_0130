<?php

namespace App\Http\Controllers;

use App\Models\Kategorija;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KategorijaController extends Controller
{
    public function index()
    {
        $kategorije = Kategorija::all();
        return response()->json($kategorije);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $kategorija = Kategorija::create($validator->validated());
        return response()->json($kategorija, 201);
    }

    public function destroy($id)
    {
        $kategorija = Kategorija::findOrFail($id);
        $kategorija->delete();
        return response()->json(['message' => 'Kategorija deleted successfully']);
    }
}
