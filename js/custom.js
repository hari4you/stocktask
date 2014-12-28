(function(){

var currTotCash = 100000; /* Total Available Cash - Static Currently  */
var alreadyListed = [];   /* Array to keep a track on already shown Currency - so that next time we can append the logic accordingly. */

/* Global function to add commas */
$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

/* Global function to update the user cash as and when the Share has been sold and brought */
updateTotaCash = function(val){
	$("#totCash").html("$ "+val).digits();	
	currTotCash = val;
	
}

updateTotaCash(currTotCash); /* Setting it for the page load */

/* Lookup search field - Logic under this are self explained */
$("#btnLookupsearch").on("click",function(){

	var symbol = $("#btnLookupsymbol").val();

	if(symbol == "") {
		$("#btnLookupsymbol").focus();
		return false;
	}
	$("#progressbar .progress-bar-striped").text("90%").css("width","90%");
	$("#progressbar").removeClass("hidden");
	$("#lookupmsg").html('Fetching JSON....');
	$.ajax({
        type: "GET",
        url: "http://data.benzinga.com/stock/"+ symbol,
        success: function (msg) {
        	
        	$("#progressbar .progress-bar-striped").text("100%").css("width","100%");
        	$("#progressbar").addClass("hidden")
        	if (typeof msg.status === "undefined") {
        		
        		$("#stockqty").focus();
        		$("#lookcompany").val(msg.name);
        		$("#looksymbol").val(msg.symbol);
				$("#lookuppanel").removeClass("hidden");
				$("#lookupmsg").addClass("hidden");
				$("#lookupheader").html(msg.name);
				$("#lookupbidcost").text(parseFloat(msg.bid).toFixed(2));
				$("#lookupaskcost").text(parseFloat(msg.ask).toFixed(2));
			}
			else {
				$("#lookupmsg").removeClass("hidden").html("Symbol does not match , please try a correct one.");
    			$("#lookuppanel").addClass("hidden");
			}

        }
    });

});
/* When user taps on Buy button - Logic under this are self explained */
$("#btnBuy").on("click",function(){


	var quantityStock = $("#stockqty").val();
	var bidCost = $("#lookupbidcost").text()
	var askCost = $("#lookupaskcost").text()
	var company = $("#lookcompany").val();
	var symbol  = $("#looksymbol").val();

	if(quantityStock == "") {
		$("#stockqty").focus();
		return false;
	}
	
	$("#nostock").addClass("hidden");
	totCashSpend = (quantityStock*askCost);

	if(parseFloat(currTotCash-totCashSpend).toFixed(2) < 1) {
		alert("You dont have enought funds to purchase this stock.");
		return false;
		
	}
	else {
		console.log("Move it" + parseFloat(currTotCash-totCashSpend).toFixed(2)	);
		
	}

	if($.inArray(symbol , alreadyListed) ==-1) {
		
		alreadyListed.push(symbol);
			
	updateTotaCash(parseFloat(currTotCash-totCashSpend).toFixed(2));

	$('#nostock').after('<tr id='+symbol+'>'+
						'<td>'+company+'</td>'+
						'<td class="quantity">'+quantityStock+'</td>'+
						'<td class="price">'+parseFloat(totCashSpend).toFixed(2)+'</td>'+
						'<td class="action"><span class="label label-primary">Action</span></td>'+
						'</tr>');
	}
	else {
		
		var getQuantity = $("#"+symbol+ " .quantity").text();
		var updateQuantity = parseInt(getQuantity)+parseInt(quantityStock);
		$("#"+symbol+ " .quantity").text(updateQuantity);
		
		var getPrice = $("#"+symbol+ " .price").text();
		var updatePrice = parseFloat(getPrice) + parseFloat(totCashSpend);
		$("#"+symbol+ " .price").text(updatePrice.toFixed(2));
		
		updateTotaCash(parseFloat(currTotCash-totCashSpend).toFixed(2));
	}



});

/* When user taps on Sell button - Logic under this are self explained */
$("#btnSell").on("click",function(){



	var quantityStock = $("#stockqty").val();
	var bidCost = $("#lookupbidcost").text()
	var askCost = $("#lookupaskcost").text()
	var company = $("#lookcompany").val();
	var symbol  = $("#looksymbol").val();
	var getQuantity = $("#"+symbol+ " .quantity").text();
	var getPrice = $("#"+symbol+ " .price").text();

	if($("#"+symbol).length == 0) {
		alert("Have no stock to sell in "+symbol+".Please buy it.");
		return false;
	}

	if(quantityStock == "") {
		$("#stockqty").focus();
		return false;
	}
	
	
	totCashSpend = (quantityStock*askCost);
	console.log(totCashSpend);
	var updateC = parseFloat(currTotCash)+parseFloat(totCashSpend);
	updateTotaCash(updateC.toFixed(2));

	var updateQuantity = parseInt(getQuantity)-parseInt(quantityStock);

		if(updateQuantity == 0){

		$("#"+symbol).remove();
		// delete from array

		var findAlreadyListed = alreadyListed.indexOf(symbol);
		if(findAlreadyListed != -1) {
			alreadyListed.splice(findAlreadyListed, 1);
		}

		if(alreadyListed.length==0)
			$("#nostock").removeClass("hidden");

		return false;

		} else {

		$("#"+symbol+ " .quantity").text(updateQuantity);
		
		
		var updatePrice = parseFloat(getPrice)-parseFloat(totCashSpend);
		$("#"+symbol+ " .price").text(updatePrice.toFixed(2));
		var subCashTotal = parseFloat(currTotCash)-parseFloat(totCashSpend)
		
		}
	


});


})();