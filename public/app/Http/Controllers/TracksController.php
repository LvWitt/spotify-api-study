<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Track;

class TracksController extends Controller
{
    public function tracks(){
        $tracks = Track::all();
        return response()->json(
            [
                'tracks' => $tracks,
                'message' => 'Tracks',
                'code' => 200
            ]
        );
    }

    public function saveTrack(Request $request) {
        $track = new Track();
        $track->id = $request->id;
        $track->track_name = $request->track_name;
        $track->artist_name= $request->artist_name;
        $track->img_url = $request->img_url;
        $track->save();
        return response()->json([
            'message' => 'Tracks Created Successfully',
            'code' => 200
        ]);
    }

    public function deleteTrack($id) {
        $track = Track::find($id);

        if ($track) {
            $track->delete();
            return response()->json([
                'message' => 'Track Deleted Successfully',
                'code' => 200
            ]);
        } else {
            return response()->json([
                'message' => "Track with id:$id does not exist!",
            ]);
        }
    }

    public function getTrack($id) {
        $track = Track::find($id);
        return response()->json($track);
    }

    public function updateTrack($id, Request $request){
        $track = Track::where('id', $id)->first();
        $track->id = $request->id;
        $track->track_name = $request->track_name;
        $track->artist_name= $request->artist_name;
        $track->img_url = $request->img_url;
        $track->save();
        return response()->json([
            'message' => 'Tracks Updated Successfully',
            'code' => 200
        ]);
    }
}
