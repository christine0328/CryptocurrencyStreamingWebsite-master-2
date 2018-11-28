//
//
//    alert("!!")
//$('#ordertable').DataTable(
////    "processing": true,
////    "serverSide": true,
//    );

$(document).ready(function() {
    $('#ordertable').DataTable(
//    "processing": true,
//    "serverSide": true,

//    "ajax": {
//        "url": "orderbook",
//        "type": "GET",
//        "success": function(data) {
//            $('#ordertable tbody').append("<tr><td>" + data['type'] + "</td><td>" + data['ask_depth'] + "</td></tr>");
//            alert("???")
//        },
//        error : function() {
//            console.log('error');
//        }

);
});


//        "success" : function(result){
//            $.each(resp, function(index, store){
//              var tr = $('<tr></tr>');
//
//              $.each(store, function(key,value){
//                tr.append($('<td></td>').html(value));
//              });
//
//              $('#ordertable').append(tr);
//            });
//        },
//
//    },
//    "columns": [
//        {"data": 'ask'},
//        {"data": 'ask_depth'},
//        {
//            "data": null,
//            "defaultContent": '<button type="button" class="btn btn-info">Edit</button>' + '&nbsp;&nbsp' +
//            '<button type="button" class="btn btn-danger">Delete</button>'
//        }
//    ]


//$(document).ready(function() {
//
//$('#datatables').DataTable(
//
////$.getJSON('/orderbook', null, function(jsonData) {
////		var askData = jsonData
////		var a=askData[0]
////		alert(a)
//////		var newtd = document.createElement("td");
////    var tr = $('<tr></tr>');
////		$("#mostRevision").html(mostRevisionData._id);
////		tr.append($('<td></td>').html(a));
////
////	});
//	);});

//  function OneOrder ( market_size, price(USD), my_size ) {
//
//      this.market_size = market_size;
//      this.price(USD) = price(USD);
//      this.my_size = my_size;
//
//      }
//  $('#datatables').DataTable();
//});
//          "ajax": {
//          "url": "orderbook/",
//          "type": "GET"
//
//      },
//      "columns": [
//          {"data": "market_size"},
//          {"data": "price(USD)"},
//          {"data": "my_size"},
//      ]


