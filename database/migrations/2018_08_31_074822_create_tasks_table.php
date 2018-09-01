<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->integer('order')->unsigned()->nullable();
            $table->boolean('is_done')->default(false);
            $table->boolean('is_super_parent')->default(true);
            $table->timestamps();
        });

        Schema::create('relationships', function (Blueprint $table){
            $table->integer('parent_id');
            $table->integer('child_id');
            $table->primary(['parent_id','child_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('relationships');
    }
}
