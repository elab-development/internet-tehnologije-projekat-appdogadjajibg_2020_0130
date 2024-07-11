<?php

namespace App\Http\Controllers;

use App\Models\Dogadjaj;
use App\Models\Mesto;
use App\Models\Kategorija;
use App\Http\Resources\DogadjajResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
            'mesto_id' => 'nullable|exists:mestos,id',
            'kategorija_id' => 'nullable|exists:kategorijas,id',
            'new_mesto_name' => 'nullable|string|max:255',
            'new_mesto_address' => 'nullable|string|max:255',
            'new_kategorija_name' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        DB::beginTransaction();

        try {
            $data = $request->all();

            if ($request->has('new_mesto_name') && $request->new_mesto_name && $request->has('new_mesto_address') && $request->new_mesto_address) {
                $mesto = Mesto::create([
                    'name' => $request->new_mesto_name,
                    'address' => $request->new_mesto_address,
                ]);
                $data['mesto_id'] = $mesto->id;
            }

            if ($request->has('new_kategorija_name') && $request->new_kategorija_name) {
                $kategorija = Kategorija::create([
                    'name' => $request->new_kategorija_name,
                ]);
                $data['kategorija_id'] = $kategorija->id;
            }

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('images', 'public');
            }

            $dogadjaj = Dogadjaj::create($data);

            DB::commit();

            return new DogadjajResource($dogadjaj);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Greška prilikom kreiranja događaja'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $dogadjaj = Dogadjaj::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'sometimes|required|date',
            'mesto_id' => 'sometimes|exists:mestos,id',
            'kategorija_id' => 'sometimes|exists:kategorijas,id',
            'new_mesto_name' => 'nullable|string|max:255',
            'new_mesto_address' => 'nullable|string|max:255',
            'new_kategorija_name' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        DB::beginTransaction();

        try {
            $data = $request->all();

            if ($request->has('new_mesto_name') && $request->new_mesto_name && $request->has('new_mesto_address') && $request->new_mesto_address) {
                $mesto = Mesto::create([
                    'name' => $request->new_mesto_name,
                    'address' => $request->new_mesto_address,
                ]);
                $data['mesto_id'] = $mesto->id;
            }

            if ($request->has('new_kategorija_name') && $request->new_kategorija_name) {
                $kategorija = Kategorija::create([
                    'name' => $request->new_kategorija_name,
                ]);
                $data['kategorija_id'] = $kategorija->id;
            }

            if ($request->hasFile('image')) {
                if ($dogadjaj->image) {
                    Storage::disk('public')->delete($dogadjaj->image);
                }
                $data['image'] = $request->file('image')->store('images', 'public');
            }

            $dogadjaj->update($data);

            DB::commit();

            return new DogadjajResource($dogadjaj);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Greška prilikom ažuriranja događaja'], 500);
        }
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
    public function statistics()
    {
        try {
            // Fetch events by category
            $eventsByCategory = Dogadjaj::select(DB::raw('count(*) as count, kategorija_id'))
                ->groupBy('kategorija_id')
                ->with('kategorija')
                ->get()
                ->map(function ($item) {
                    return [
                        'category' => $item->kategorija ? $item->kategorija->name : 'Unknown',
                        'count' => $item->count,
                    ];
                });
    
            // Log the eventsByCategory for debugging
            \Log::info('Events By Category:', $eventsByCategory->toArray());
    
            // Fetch events by day of the week
            $eventsByDay = Dogadjaj::select(DB::raw('count(*) as count, DAYOFWEEK(start_time) as day'))
                ->groupBy(DB::raw('DAYOFWEEK(start_time)'))
                ->get()
                ->map(function ($item) {
                    return [
                        'day' => $this->getDayName($item->day),
                        'count' => $item->count,
                    ];
                });
    
            // Log the eventsByDay for debugging
             Log::info('Events By Day:', $eventsByDay->toArray());
    
            return response()->json([
                'eventsByCategory' => $eventsByCategory,
                'eventsByDay' => $eventsByDay,
            ]);
        } catch (\Exception $e) {
             Log::error('Error fetching statistics:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'An error occurred while fetching statistics'], 500);
        }
    }
    
    // Helper function to map day of the week to a readable format
    private function getDayName($dayNumber)
    {
        $days = [
            1 => 'Sunday',
            2 => 'Monday',
            3 => 'Tuesday',
            4 => 'Wednesday',
            5 => 'Thursday',
            6 => 'Friday',
            7 => 'Saturday',
        ];
    
        return $days[$dayNumber] ?? 'Unknown';
    }
    
    

}
