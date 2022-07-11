<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Comment;

class CommentsController extends Controller
{
    public function showByAlphabetical() {
        $comments = Comment::orderBy('name')->get();

        return response()->json([
            'comments' => $comments
        ],200);
    }
    
    public function showByReverseAlphabetical() {
        $comments = Comment::orderByDesc('name')->get();

        return response()->json([
            'comments' => $comments
        ],200);
    }

    public function showByNew() {
        // All Comments in the datebase have the same date! Assuming id for comment age
        $comments = Comment::orderByDesc('id')->get();

        return response()->json([
            'comments' => $comments
        ],200);
    }


    public function showByOld() {
        // All Comments in the datebase have the same date! Assuming id for comment age
        $comments = Comment::orderBy('id')->get();  

        return response()->json([
            'comments' => $comments
        ],200);
    }

    public function showByAuthor(Request $request) {
        $comments = Comment::where('name', 'LIKE', '%'.$request->name.'%')->get(); 

        return response()->json([
            'comments' => $comments
        ],200);
    }

    public function approve(Request $request) {
        // grab a comment by id
        $comment = Comment::where('id', $request->id);
        // update approved state from request
        $comment->update(['approved' => $request->bool]);

        // lets return the updated comment to update react state
        $comment = Comment::where('id', $request->id)->get();

        return response()->json([
            'comment' => $comment
        ],200);
    }
}
