<?php

namespace App\Http\Controllers;

use App\Models\block;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlockController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    function block(Request $request)
    {
        $user_id = Auth::user()->id;
        $request->validate([
            'target_id' => 'required|int|max:11'
        ]);
       
        $block = block::create([
            'user_id' => $user_id,
            'target_id' => $request->target_id
        ]);

        
        $notification = Notification::create([
            "user_id" => $user_id,
            "target_id" => $request->target_id,
            "type" => "block",
            "message" => "blocked you"
        ]);


        return response()->json([
            'status' => 'success',
            'message' => 'block has ben commited',
            'block' => $block,
        ]);

    }
}
