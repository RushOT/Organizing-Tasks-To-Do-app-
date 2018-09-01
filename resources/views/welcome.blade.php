<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>To Do</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="{{asset('css/simple-line-icons/css/simple-line-icons.css')}}">
        <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}" crossorigin="anonymous">
        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                margin: 0;
            }

            .order{
                font-size: 1.2rem;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .content{
                min-height: 100%;
            }

            .badge .badge-pill .badge-primary{
                font-size: 2rem;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content mt-4">
                    <div class="card">
                        <div class="card-header">
                            <nav class="nav nav-pills nav-fill">
                                <a class="nav-item nav-link active bg-info" href="#" id="allTasksTab"> <i class="icon icon-list"></i> All Tasks</a>
                                <a class="nav-item nav-link" href="#" id="addTaskTab"> <i class="icon icon-plus"></i> Add Task</a>
                                <a class="nav-item nav-link" href="#" id="doneTasksTab"> <i class="icon icon-user-following"></i> Done</a>
                            </nav>
                        </div>
                        <div class="card-body p-2" id="cardBody">
                            <h5>No Tasks!</h5>
                        </div>
                    </div>
            </div>
        </div>
    </body>


    <script src="{{asset('js/jquery.min.js')}}"></script>
    <script src="{{asset('js/popper.min.js')}}"></script>
    <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script>
    <script src="{{asset('js/bootstrap.min.js')}}"></script>
    <script src="{{asset('js/axios.min.js')}}"></script>
    <script src="{{asset('js/myapp.js')}}"></script>
    <script type="text/javascript">


    </script>
</html>
