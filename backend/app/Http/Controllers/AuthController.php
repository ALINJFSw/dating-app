<?php

namespace App\Http\Controllers;

use App\Models\block;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use URL;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register','retrevePassword']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);

    }

    public function register(Request $request)
    {
        $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'profile_image' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'gender' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'age' => 'required|string|max:255'


        ]);

        $user = User::create([
            'first_name' => $request->fname,
            'last_name' => $request->lname,
            'email' => $request->email,
            'profile_image' => "image",
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
            'city' => $request->city,
            'age' => $request->age
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function getUsers(Request $request)
    {
        $gender = Auth::user()->gender;
        $user_id = Auth::user()->user_id;

        $users = [];
        $request->validate([

            'name' => 'required|string|max:255',
        ]);


        if ($request->city && !$request->age) {
            $city = Auth::user()->city;
            $users = User::where('gender', '<>', $gender)->where("first_name", $request->name)->where("city", $city)->get();
        } else if ($request->age && !$request->city) {
            $age = Auth::user()->age;
            $users = User::where('gender', '<>', $gender)->where("first_name", $request->name)->where("age", $age)->get();
        } else if ($request->city && $request->age) {

            $city = Auth::user()->city;
            $age = Auth::user()->age;
            $users = User::where('gender', '<>', $gender)->where("first_name", $request->name)->where("age", $age)->where("city", $city)->get();
        } else {
            print($request->first_name);
            $users = User::where('gender', '<>', $gender)->where("first_name", $request->name)->get();
        }

        return response()->json([
            'status' => 'success',
            'users' => $users,
        ]);
    }
    public function getUserInfo()
    {
        $user_id = Auth::user()->id;
        $user_info = User::find($user_id);
        return response()->json([
            'status' => 'success',
            'user_info' => $user_info,
        ]);
    }


    public function updateUser(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image',
            'bio' => 'string|max:255',
            'image1' => 'string|max:255',
            'image2' => 'string|max:255',
            'image3' => 'string|max:255',
        ]);
        $user_id = Auth::user()->id;
        $updatedUser = User::find($user_id);
        if ($request->hasFile('profile_image'))

            $request->validate([
                'image' => 'mimes:jpeg,bmp,png'
            ]);
        if ($request->file('profile_image') == null) {
            $file = "";
        } else {
            $path = Storage::putFile('avatars', $request->file('profile_image'));
           $updatedUser->profile_image = URL::asset($path);
        }
        if ($request->bio) {
            $updatedUser->bio = $request->bio;
        }
        if ($request->image1) {
            $updatedUser->image1 = $request->image1;
        }
        if ($request->image2) {
            $updatedUser->image2 = $request->image2;
        }
        if ($request->image3) {
            $updatedUser->image3 = $request->image3;
        }
        $updatedUser->save();
        return response()->json([
            'status' => 'success',
            'message' => 'user updated successfully',
            'user' => $request->file('profile_image'),
        ]);
    }

    public function getRuningUser()
    {
        $user = [];
        return response()->json([
            'status' => 'success',
            'user' => Auth::user()
        ]);
    }

    public function getUserById(Request $request)
    {
        $user = User::find($request->id);
        return response()->json([
            'status' => 'success',
            'user' => $user
        ]);
    }

    public function retrevePassword(Request $request){
        $request->validate([
            'email' => 'required|string|max:255',
            'age' => 'required|int|max:100',
            'city' => 'required|string|max:255',
            'password' => 'required|string|max:255',
        ]);
        $user = User::where("email",$request->email)->first();
        if (!$user) {
            return response()->json([
                "status" => "faild",
                "response" => "this email does not exist"
            ]);
        }
        if($user->age == $request->age && $user->city == $request->city){
            $user->password = Hash::make($request->password);
            $user->save();
            return response()->json([
                "status" => "user password updated",
                "response" => "succes"
            ]);
        }
        else{
            return response()->json([
                "status" => "faild",
                "response" => "your age or city are invalid"
            ]);
        }        
    }

  

}