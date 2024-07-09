<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserUloga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign default role with id 1
        UserUloga::create([
            'user_id' => $user->id,
            'uloga_id' => 1,
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => new UserResource($user),
        ]);
    }

    public function logout(Request $request)
    {
        // Dohvatite trenutno autentifikovanog korisnika
        $user = Auth::user();
    
        // Proverite da li je korisnik autentifikovan
        if ($user) {
            // Obrišite trenutni pristupni token
            $user->currentAccessToken()->delete();
    
            // Vratite JSON odgovor sa porukom o uspešnom odjavljivanju
            return response()->json(['message' => 'Successfully logged out'], 200);
        }
    
        // Ako korisnik nije autentifikovan, vratite odgovor sa greškom
        return response()->json(['message' => 'User not authenticated'], 401);
    }
    

    public function myProfile()
    {
        return new UserResource(Auth::user());
    }
}
