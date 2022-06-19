function flashMessage(type,message){

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    Command: toastr[type](message);
};

function deleteRecord(id,url,callback) {
    swal({
      title: "Deseja deletar o registro " + id,
      text: "Essa operação não pode ser desfeita",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, deletar!",
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
    },
    function(){

        $.ajax({
            type: "POST",
            url: url,
            data: {
                id: id,
            },
            success: function(data) {
                // atualiza tabela
                // $( '#table' ).dataTable().api().ajax.reload( null, false )
                if(data.type == 'error'){
                    swal("Erro ao deletar", data.message, "error")
                    flashMessage('error',data.message);
                }
                else{
                    callback();      
                    swal("Sucesso", 'registro excluído com sucesso', "success");
                    flashMessage('success','registro excluído com sucesso');
                }
                
            },
            error: function(result) {
                    console.log("Data not found")
            }
        })


    })
}


var dataTableTranslation = {
    "sEmptyTable": "Nenhum registro encontrado",
    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
    "sInfoPostFix": "",
    "sInfoThousands": ".",
    "sLengthMenu": "_MENU_ resultados por página",
    "sLoadingRecords": "Carregando...",
    "sProcessing": "Processando...",
    "sZeroRecords": "Nenhum registro encontrado",
    "sSearch": "Pesquisar",
    "oPaginate": {
        "sNext": "Próximo",
        "sPrevious": "Anterior",
        "sFirst": "Primeiro",
        "sLast": "Último"
    },
    "oAria": {
        "sSortAscending": ": Ordenar colunas de forma ascendente",
        "sSortDescending": ": Ordenar colunas de forma descendente"
    },
    buttons: {
        copyTitle: 'Copiar',
        // copyKeys: 'Appuyez sur <i>ctrl</i> ou <i>\u2318</i> + <i>C</i> pour copier les données du tableau à votre presse-papiers. <br><br>Pour annuler, cliquez sur ce message ou appuyez sur Echap.',
        copySuccess: {
            _: '%d linhas copiadas',
            1: '1 linha copiada'
        }
    }
};

var dataTableButtons = [
    {extend: 'copy', text:'<i class="fa fa-clipboard fa"></i>',titleAttr: 'Copiar'},
    {extend: 'csv', text:'<i class="fa fa-file-o"></i>',titleAttr: 'CSV'},
    {extend: 'excel', title: 'Listagem',text:'<i class="fa fa-file-excel-o"></i>',titleAttr: 'Excel'},
    {extend: 'pdf', title: 'Listagem',text:'<i class="fa fa-file-pdf-o"></i>',titleAttr: 'PDF'},

    {extend: 'print', text: '<i class="fa fa-print"></i>',titleAttr: 'Imprimir',
        customize: function (win){
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');

                $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
        }
    }
];

$('#back').on('click', function(e){

    e.preventDefault();
    window.history.back();
});