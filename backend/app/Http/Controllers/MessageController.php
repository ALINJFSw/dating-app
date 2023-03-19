<?php

namespace App\Http\Controllers;

use App\Models\block;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Namshi\JOSE\Signer\OpenSSL\None;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    public function sendMessage(Request $request){
        $user_id = Auth::user()->id;
        $request->validate([
            "target_id" => "required|int",
            "message" => "required|string",
        ]);

        $isBlocked = block::where("target_id",$user_id);
        print(json_encode($isBlocked));
        if($isBlocked == []){
            return response()->json([
                "status" => "faild",
                "message" => "you can't message this user because your blocked"
            ]);
        }
        $message = Message::create([
            "user_id" => $user_id,
            "target_id" => $request->target_id,
            "message" =>$request->message
        ]);

        return response()->json([
            "status" => "success",
            "message" => $message
        ]);
    }

    public function getMessages() {
        $user_id = Auth::user()->id;
        $messages = Message::find($user_id);
        return response()->json([
            "status" => "success",
            "message" => $messages
        ]);
    }
}
