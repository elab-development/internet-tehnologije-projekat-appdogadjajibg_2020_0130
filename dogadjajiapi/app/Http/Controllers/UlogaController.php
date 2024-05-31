<?php

namespace App\Http\Controllers;

use App\Models\Uloga;
use App\Http\Resources\UlogaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UlogaController extends Controller
{
    public function index()
    {
        $uloge = Uloga::all();
        return UlogaResource::collection($uloge);
    }

    public function show($id)
    {
        $uloga = Uloga::findOrFail($id);
        return new UlogaResource($uloga);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:uloga,name',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $uloga = Uloga::create($request->all());

        return new UlogaResource($uloga);
    }

    public function update(Request $request, $id)
    {
        $uloga = Uloga::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255|unique:uloga,name,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $uloga->update($request->all());

        return new UlogaResource($uloga);
    }

    public function destroy($id)
    {
        $uloga = Uloga::findOrFail($id);
        $uloga->delete();

        return response()->json(null, 204);
    }
}
