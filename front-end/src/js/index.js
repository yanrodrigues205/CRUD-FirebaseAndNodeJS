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
            `<button type="button" data-id="${response[i].id}" class="btn btn-success"><i class="fa-solid fa-pencil"></i></button> <button type="button" data-id="${response[i].id}" onclick="actionDeleteById(this)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal" ><i class="fa-solid fa-trash"></i></button>`
        ]).draw();
      }
   })
   .fail(function(jqXHR, textStatus, msg){
        alert(msg);
   });
}
getAll();