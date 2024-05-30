<?php

namespace App\Http\Controllers;

use App\Models\Mesto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MestoController extends Controller
{
    public function index()
    {
        $mesta = Mesto::all();
        return response()->json($mesta);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mesto = Mesto::create($validator->validated());
        return response()->json($mesto, 201);
    }

    public function destroy($id)
    {
        $mesto = Mesto::findOrFail($id);
        $mesto->delete();
        return response()->json(['message' => 'Mesto deleted successfully']);
    }
}
