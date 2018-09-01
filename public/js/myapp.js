function getId(clickedId) {
    var type;
    var id;
    if(clickedId.includes("up")){
        type = "up";
        id = parseInt(clickedId.replace(type, ""));

        console.log(id);
        axios.post('api/tasks/'+id,{
            action: type
        }).
        then(function (response) {
            if(response.data.success){
                $('#card'+id).each(function () {
                    if (!$(this).text().match(/^\s*$/)) {
                        $(this).insertBefore($(this).prev('#card'+response.data.above));
                    }
                });
            }
        }).
        catch(function (error) {
            console.log(error);
        });
    }else if(clickedId.includes("down")){
        type = "down";
        id = parseInt(clickedId.replace(type, ""));

        axios.post('api/tasks/'+id,{
            action: type
        }).
        then(function (response) {
            if(response.data.success){
                $('#card'+id).each(function () {
                    if (!$(this).text().match(/^\s*$/)) {
                        $(this).insertAfter($(this).next('#card'+response.data.below));
                    }
                });
            }
        }).
        catch(function (error) {
            console.log(error);
        });

    }else if(clickedId.includes("edit")){
        type = "edit";
        id = parseInt(clickedId.replace(type, ""));
        var title = $('#title' + id).text();

        $('#card'+id).append('<div class="row"> <input id="input' + id + '" type="text" class="col-md-9 m-4"  name="title" value="' + title + '">' +
            ' <button id="submit' + id + '" onclick="getId(this.id)" class="btn btn-primary col-md-3 ml-4 mb-4">Submit</button> </div>');

    }else if(clickedId.includes("delete")){
        type = "delete";
        id = parseInt(clickedId.replace(type, ""));

        axios.post('api/tasks/'+id,{
            action: type
        }).
        then(function (response) {
            if(response.data.success){
                $('#card'+id).remove();
            }
        }).
        catch(function (error) {
            console.log(error);
        });
    }else if(clickedId.includes("like")){
        type = "like";
        id = parseInt(clickedId.replace(type, ""));

        axios.post('api/tasks/'+id,{
            action: type
        }).
        then(function (response) {
            if(response.data.success){
                $('#card'+id).remove();
            }
        }).
        catch(function (error) {
            console.log(error);
        });
    }else if(clickedId.includes("submit")){
        type = "submit";
        id = parseInt(clickedId.replace(type, ""));

        axios.post('api/tasks/'+id,{
            action: type,
            title: $('#input' + id).val()
        }).
        then(function (response) {
            if(response.data.success){
                $('#title' + id).text(response.data.title);
                $('#submit' + id).remove();
                $('#input' + id).remove();
            }
        }).
        catch(function (error) {
            console.log(error);
        });

    }
    else if(clickedId.includes("add")){
        type = "add";
        id = parseInt(clickedId.replace(type, ""));

        $('#card'+id).append('<div class="row"> <input id="subTitle' + id + '" type="text" class="col-md-9 m-4"  name="title" placeholder="Sub task title...">' +
            ' <button id="subTaskAdd' + id + '" onclick="getId(this.id)" class="btn btn-primary col-md-3 ml-4 mb-4">Add</button> </div>');

    }else if(clickedId.includes("subTaskAdd")){
        type = "subTaskAdd";
        id = parseInt(clickedId.replace(type, ""));

        axios.post('api/tasks/'+id,{
            action: type,
            title: $('#subTitle' + id).val()
        }).
        then(function (response) {
            if(response.data.success){
                $('#subTitle' + id).remove();
                $('#subTaskAdd' + id).remove();
                alert('Successfully added');
            }
        }).
        catch(function (error) {
            console.log(error);
        });

    }else if(clickedId.includes("showChildren")){
        type = "showChildren";
        id = parseInt(clickedId.replace(type, ""));

        axios.post('api/tasks/'+id,{
            action: type
        }).
        then(function (response) {
            if(response.data.success){
                var count = response.data.child_tasks.data.length;
                console.log(response.data.child_tasks.data.length);
                console.log(response.data.child_tasks.data);
                var i;

                $('#field'+id).empty();
                for(i = 0; i < count; i++){

                    $('#field'+id).append('<div class="card m-2" id="card' + response.data.child_tasks.data[i].id +'">\n' +
                        '                                <div class="card-header text-right">\n' +
                        '                                    <button id="showChildren'+ response.data.child_tasks.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-info pull-right"> <i class="icon icon-list"></i> All Sub Tasks</button>\n' +
                        '                                    <button id="add'+ response.data.child_tasks.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-warning pull-right"> <i class="icon icon-plus"></i> Add Sub Task</button>\n' +
                        '                                    <button id="up'+ response.data.child_tasks.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-primary pull-right"> <i class="icon icon-arrow-up"></i></button>\n' +
                        '                                    <button id="down'+ response.data.child_tasks.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-primary pull-right"> <i class="icon icon-arrow-down"></i></button>\n' +
                        '                                    <button id="edit'+ response.data.child_tasks.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-info pull-right"> <i class="icon icon-pencil"></i></button>\n' +
                        '                                    <button id="delete'+ response.data.child_tasks.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-danger"> <i class="icon icon-trash"></i></button>\n' +
                        '                                    <button id="like'+ response.data.child_tasks.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-outline-info"> <i class="icon icon-like"></i></button>\n' +
                        '                                </div>\n' +
                        '                                <div class="card-body p-2">\n' +
                        '                                    <h5 class="card-title" id="title'+ response.data.child_tasks.data[i].id +'">' + response.data.child_tasks.data[i].title + '</h5>\n' +
                        '                                    <p class="card-text"><small class="text-muted"> created <b>' + response.data.child_tasks.data[i].created_at + '</b></small></p>\n' +
                        '                                </div>\n' +
                        '                                <div class="card-body p-2" id="field' + response.data.child_tasks.data[i].id +'">\n' +

                        '                                </div>\n' +
                        '                            </div>');
                }
            }
        }).
        catch(function (error) {
            console.log(error);
        });
    }


}

$(document).ready(function(){
    var tasksTab = $('#allTasksTab');
    var addTaskTab = $('#addTaskTab');
    var doneTasksTab = $('#doneTasksTab');
    var cardBody = $('#cardBody');

    addTaskTab.click(function(){
        cardBody.empty();
        tasksTab.removeClass(' active bg-info');
        doneTasksTab.removeClass(' active bg-info');
        addTaskTab.addClass(' active bg-info');
        cardBody.append('<input id="taskInput" type="text" class="form-control"  name="title" value="">\n');
    });

    var taskInput = $('#taskInput');

    tasksTab.click(function(){
        cardBody.empty();
        addTaskTab.removeClass(' active bg-info');
        doneTasksTab.removeClass(' active bg-info');
        tasksTab.addClass(' active bg-info');

        axios.get('/api/tasks')
            .then(function(response){
                var count = response.data.data.length;
                var i;
                for(i = 0; i < count; i++){

                    cardBody.append('<div class="card m-2" id="card' + response.data.data[i].id +'">\n' +

                        '                                <div class="card-header text-right">\n' +
                        '                                    <button id="showChildren'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-info pull-right"> <i class="icon icon-list"></i> All Sub Tasks</button>\n' +
                        '                                    <button id="add'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-warning pull-right"> <i class="icon icon-plus"></i> Add Sub Task</button>\n' +
                        '                                    <button id="add'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-warning pull-right"> <i class="icon icon-plus"></i> Sub Task</button>\n' +
                        '                                    <button id="up'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-primary pull-right"> <i class="icon icon-arrow-up"></i></button>\n' +
                        '                                    <button id="down'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-primary pull-right"> <i class="icon icon-arrow-down"></i></button>\n' +
                        '                                    <button id="edit'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-info pull-right"> <i class="icon icon-pencil"></i></button>\n' +
                        '                                    <button id="delete'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-danger"> <i class="icon icon-trash"></i></button>\n' +
                        '                                    <button id="like'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-outline-info"> <i class="icon icon-like"></i></button>\n' +
                        '                                </div>\n' +
                        '                                <div class="card-body p-2">\n' +
                        '                                    <h5 class="card-title" id="title'+ response.data.data[i].id +'">' + response.data.data[i].title + '</h5>\n' +
                        '                                    <p class="card-text"><small class="text-muted"> created <b>' + response.data.data[i].created_at + '</b></small></p>\n' +
                        '                                </div>\n' +
                        '                                <div class="card-body p-2" id="field' + response.data.data[i].id +'">\n' +

                        '                                </div>\n' +
                        '                            </div>');
                }
            })
            .catch(function(error){

            });
    });

    doneTasksTab.click(function(){
        cardBody.empty();
        tasksTab.removeClass(' active bg-info');
        doneTasksTab.addClass(' active bg-info');
        addTaskTab.removeClass(' active bg-info');

        axios.get('/api/tasks/done')
            .then(function(response){
                var count = response.data.data.length;
                var i;
                for(i = 0; i < count; i++){

                    cardBody.append('<div class="card m-2" id="card' + response.data.data[i].id +'">\n' +
                        '                                <div class="card-header text-right">\n' +
                        '                                    <button class="card-link btn btn-danger" id="delete'+ response.data.data[i].id +'" onclick="getId(this.id)"> <i class="icon icon-trash"></i></button>\n' +
                        '                                    <button class="card-link btn btn-info" disabled> <i class="icon icon-check"></i></button>\n' +
                        '                                </div>\n' +
                        '                                <div class="card-body bg-light p-2">\n' +
                        '                                    <h5 class="card-title">' + response.data.data[i].title + '</h5>\n' +
                        '                                    <p class="card-text"><small class="text-muted"> created <b>' + response.data.data[i].created_at + '</b></small></p>\n' +
                        '                                </div>\n' +
                        '                            </div>');
                }
            })
            .catch(function(error){

            });
    });


    axios.get('/api/tasks')
        .then(function(response){
            var count = response.data.data.length;
            if(count > 0){
                cardBody.empty();
            }
            var i = 0;
            for(i = 0; i < count; i++){

                cardBody.append('<div class="card m-2" id="card' + response.data.data[i].id +'">\n' +
                    '                                <div class="card-header text-right">\n' +
                    '                                    <button id="showChildren'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-info pull-right"> <i class="icon icon-list"></i> All Sub Tasks</button>\n' +
                    '                                    <button id="add'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-warning pull-right"> <i class="icon icon-plus"></i> Add Sub Task</button>\n' +
                    '                                    <button id="up'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-primary pull-right"> <i class="icon icon-arrow-up"></i></button>\n' +
                    '                                    <button id="down'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-primary pull-right"> <i class="icon icon-arrow-down"></i></button>\n' +
                    '                                    <button id="edit'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-info pull-right"> <i class="icon icon-pencil"></i></button>\n' +
                    '                                    <button id="delete'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-danger"> <i class="icon icon-trash"></i></button>\n' +
                    '                                    <button id="like'+ response.data.data[i].id +'" onclick="getId(this.id)" class="card-link btn btn-outline-info"> <i class="icon icon-like"></i></button>\n' +
                    '                                </div>\n' +
                    '                                <div class="card-body p-2">\n' +
                    '                                    <h5 class="card-title" id="title'+ response.data.data[i].id +'">' + response.data.data[i].title + '</h5>\n' +
                    '                                    <p class="card-text"><small class="text-muted"> created <b>' + response.data.data[i].created_at + '</b></small></p>\n' +
                    '                                </div>\n' +
                    '                                <div class="card-body p-2" id="field' + response.data.data[i].id +'">\n' +

                    '                                </div>\n' +
                    '                            </div>');
            }
        })
        .catch(function(error){

        });

    $(document).keypress(function(e) {
        if(e.which == 13) {
            axios.post('/api/tasks', {
                title: $('input.form-control').val()
            })
                .then(function (response) {
                    $('input').val("");
                    alert("Task is successfully added!");
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    });

});