<?php

namespace App\Http\Controllers;

use App\Models\Dogadjaj;
use App\Http\Resources\DogadjajResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class DogadjajController extends Controller
{
    public function index()
    {
        $dogadjaji = Dogadjaj::all();
        return DogadjajResource::collection($dogadjaji);
    }

    public function show($id)
    {
        $dogadjaj = Dogadjaj::with(['mesto', 'kategorija'])->findOrFail($id);
        return new DogadjajResource($dogadjaj);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
            'mesto_id' => 'required|exists:mestos,id',
            'kategorija_id' => 'required|exists:kategorijas,id',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $dogadjaj = Dogadjaj::create($data);

        return new DogadjajResource($dogadjaj);
    }

    public function update(Request $request, $id)
    {
        $dogadjaj = Dogadjaj::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'sometimes|required|date',
            'mesto_id' => 'sometimes|required|exists:mestos,id',
            'kategorija_id' => 'sometimes|required|exists:kategorijas,id',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($dogadjaj->image) {
                Storage::disk('public')->delete($dogadjaj->image);
            }
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $dogadjaj->update($data);

        return new DogadjajResource($dogadjaj);
    }

    public function destroy($id)
    {
        $dogadjaj = Dogadjaj::findOrFail($id);

        if ($dogadjaj->image) {
            Storage::disk('public')->delete($dogadjaj->image);
        }

        $dogadjaj->delete();

        return response()->json(null, 204);
    }

    
    public function search(Request $request)
    {
        $query = Dogadjaj::query();

        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->input('title') . '%');
        }

        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->input('description') . '%');
        }

        if ($request->has('mesto_id')) {
            $query->where('mesto_id', $request->input('mesto_id'));
        }

        if ($request->has('kategorija_id')) {
            $query->where('kategorija_id', $request->input('kategorija_id'));
        }

        $dogadjaji = $query->with(['mesto', 'kategorija'])->get();

        return DogadjajResource::collection($dogadjaji);
    }
}
