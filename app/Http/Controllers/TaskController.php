<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskCollection;
use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function index(){
        return new TaskCollection(Task::orderBy('order','asc')->where([['is_done',false],['is_super_parent', true]])->get());
    }

    public function getTasksDone(){
        return new TaskCollection(Task::orderBy('created_at','desc')->where('is_done',true)->get());
    }

    public function getTask(Request $request,$id){
        $action = $request['action'];
        if($action == "delete"){
            $task = Task::find($id);
            DB::table('relationships')->where('child_id',$task->id)->orWhere('parent_id',$task->id)->delete();
            $task->delete();


            return response()->json(['success'=>true]);
        }else if($action == "up"){
            $task = Task::find($id);
            $above = Task::orderBy('order','desc')->where('order','<',$task->order)->first();
            if($above){
                $temp = $task->order;
                $task->order = $above->order;
                $above->order = $temp;

                $task->update();
                $above->update();

                return response()->json(['success'=>true, 'above' => $above->id]);
            }
        }else if($action == "down"){
            $task = Task::find($id);
            $below = Task::orderBy('order','asc')->where('order','>',$task->order)->first();

            if($below){
                $temp = $task->order;
                $task->order = $below->order;
                $below->order = $temp;

                $task->update();
                $below->update();

                return response()->json(['success'=>true, 'below' => $below->id]);
            }
        }else if($action == "like"){
            $task = Task::find($id);
            $task->is_done = true;
            $task->update();

            return response()->json(['success'=>true]);
        }else if($action == "submit"){
            $task = Task::find($id);
            $task->title = $request['title'];
            $task->update();

            return response()->json(['success'=>true, 'title' => $task->title]);
        }
        else if($action == "subTaskAdd"){
            $task = Task::find($id);

            $subTask = new Task();
            $subTask->title = $request['title'];
            $subTask->is_super_parent = false;
            $subTask->save();

            DB::table('relationships')->insert(['child_id' => $subTask->id,'parent_id' => $task->id]);

            return response()->json(['success'=>true]);
        }else if($action == "showChildren"){

            $subTasksSelect = DB::table('relationships')
                ->where('parent_id',$id)->get();
            $arr = [];
            $i = 0;

            foreach ($subTasksSelect as $s){
                $arr[$i++] = $s->child_id;
            }

            $subTasks = new TaskCollection(Task::whereIn('id', $arr)->where('is_done',false)->get());

            return response()->json(['success'=>true, 'child_tasks' => $subTasks]);
        }

        return response()->json(['success'=>false]);
    }

    public function store(Request $request){
        $this->validate($request, [
            'title' => 'required'
        ]);

        $order = DB::table('tasks')->max('order') + 1;

        if(empty($order)){
            $order = 1;
        }

        $title = $request['title'];

        $task = new Task();
        $task->title = $title;
        $task->order = $order;
        $task->is_super_parent = true;
        $task->save();
    }
}
