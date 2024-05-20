const data = new DataTable("#example");
const dominio = "http://localhost:3030/";



function getAll()
{
    data.clear().draw();
    $.ajax({
        url : dominio + "collect_point/getall",
        type : 'GET',
        beforeSend : function(){
            // $("#resultado").html("ENVIANDO...");
        }
   })
   .done(function(response){
      for(let i =0 ; i < response.length ; i++){
        data.row.add([
            response[i].id,
            response[i].name,
            response[i].description,
            response[i].work_hours,
            response[i].collect_user,
            `<button type="button" data-id="${response[i].id}" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="actionUpdateById(this)"><i class="fa-solid fa-pencil"></i></button> <button type="button" data-id="${response[i].id}" onclick="actionDeleteById(this)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal" ><i class="fa-solid fa-trash"></i></button>`
        ]).draw();
      }
   })
   .fail(function(jqXHR, textStatus, msg){
        alert(msg);
   });
}


function actionDeleteById(element)
{
    let id = element.getAttribute("data-id");
    $("#collect_point_id").text(id);
    const confirm = document.getElementById("confirm_delete");
    confirm.setAttribute("data-id", id);
}


function deleteById(element)
{
    let id = element.getAttribute("data-id");
    console.log("acionou funcao, id => "+ id)
    $.ajax({
        url: dominio + "collect_point/delete/" + id,
        type: "DELETE"
    }).done((response) => {
        console.log(response);
        if(response.status == 202)
        {
            alert("The collection point has been successfully deleted!");
            getAll();
        }
    })
}

function actionUpdateById(element)
{
    let id = element.getAttribute("data-id");
    console.log(id)
    $.ajax({
        url: dominio + "collect_point/getbyid",
        dataType: "json",
        type: "POST",
        data: JSON.stringify({ id: id }),
        contentType: "application/json; charset=utf-8"
    }).done(response => {
        console.log(response.name);
        $("#name_cp").val(response.name);
        $("#description_cp").val(response.description);
        $("#id_cp").val(id);
        $("#work_hours_cp").val(response.work_hours);
        $("#collect_user_cp").val(response.collect_user);

    });
}

function updateById()
{
    const id = $("#id_cp").val();
    const name = $("#name_cp").val();
    const description = $("#description_cp").val();
    const work_hours = $("#work_hours_cp").val();
    const collect_user = $("#collect_user_cp").val();

    let data = {
        id,
        name,
        description,
        work_hours,
        collect_user
    }



    $.ajax({
        url: dominio + "collect_point/update",
        dataType: "json",
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done(response => {
        alert(response.message);
        getAll();
    });

}


getAll();