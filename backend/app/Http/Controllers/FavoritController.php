<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoritController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    function addToFavorite(Request $request)
    {
        $user_id = Auth::user()->id;
        $request->validate([
            'target_id' => 'required|int|max:11'
        ]);
        $target = User::find($request->target_id);
        if($target->gender == Auth::user()->gender){
            return response()->json([
                'status' => 'faild',
                'message' => 'your are not allowd to follow one of your gender',
            ]);
        }
        $favorite = Favorite::create([
            'user_id' => $user_id,
            'target_id' => $request->target_id
        ]);

        $notification = Notification::create([
            "user_id" => $user_id,
            "target_id" => $request->target_id,
            "type" => "favorite",
            "message" => "marked you as favorite"
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Favorite created successfully',
            'todo' => $favorite,
        ]);

    }
}