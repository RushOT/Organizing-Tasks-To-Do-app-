<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskTest extends TestCase
{

         public function testEmpty()
         {
             $value = [];
             $this->assertEmpty($value);
             return $value;
         }
         /**
          * @depends testEmpty
          */
         public function testPush(array $value)
         {
             array_push($value, 'first');
             $this->assertEquals('first', $value[count($value) - 1]);
             $this->assertNotEmpty($value);
             return $value;
         }

         public function testFailure(){
           $this->assertContains(4, [1, 2, 3]);
         }
}
