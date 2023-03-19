<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function getNotifications(){
        $user_id = Auth::user()->id;
        $notifications = Notification::where("user_id",$user_id);
        return response()->json([
            "status" => "success",
            "message" => $notifications
        ]);
    }
}
