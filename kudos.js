var sending_kudo = false;

function sendKudoInfoToServer(element_id){
	// strip any unnecessary characters from the element_id
	// to make it match the id of the post on your server
	// send an ajax call to your server that the kudo for that 
	// post has been incremented.
	if (! sending_kudo){
		sending_kudo = true;
			// just to guarantee you don't accidentally send two 
			// right after each other.
		console.log("kudo sent");
		setTimeout("sending_kudo = false;", 50);
	}
}

function removeKudo(element) {
	sendKudo(element.attr('id'));
}


function startKudoing(element) {
	element.oldKudoText = element.find("a.count").html();
	//element.append('<p class="count notice"><span class="dont-move">Giving Kudos...</span></p>');
	element.addClass("active");
	element_id = element.attr('id');
	setTimeout("sendKudo('" + element_id +"')", 700 );
}

function endKudoing(element) {	
	if (element.hasClass("kudoable")){
		element.removeClass("active");
	}
}

// whatever it is.
function sendKudo(element_id) {
	var element = $("#"+element_id);
	element.flag = true; 
	element.article = element.closest("article").attr("id");
	sendKudoInfoToServer(element_id);
	var increment = element.hasClass('kudoable') ? 1 : -1;
	element.removeClass("active").toggleClass("kudoable complete");
	$.cookie(element.article, true);
	var count = element.find('a.count .num');
	newnum = parseInt(count.text()) + increment;
	count.html(newnum);
}

$(function() {


	$("figure.kudo").each(function(e) {
		// test if they've already left a kudo for each article by 
		// checking their cookies. 
		// TODO: this WILL fail when you hit the max number of cookies for a site.
		// remove their ability to give it a kudo if they've already done so.
		var id = $(this).closest("article").attr("id");
		if ($.cookie(id)){
			$(this).removeClass("kudoable").addClass("complete");
		} // otherwise the cookie is null and they haven't given a kudo
	});
	$.kudo = {};
	$.kudo.flag = false; 
	$.kudo.article = false;
	
	$("a.kudobject").click(function(e) {
		var k = $(this).closest('.kudo');
		if (k.hasClass("complete")) {
			removeKudo(k);
		}
		else {
			e.preventDefault();
			return false;				
		}
	}).mouseenter(function() {
		var k = $(this).closest('.kudo');
		if (k.hasClass("kudoable")){
			startKudoing(k);
		}
	}).mouseleave(function() {
		var k = $(this).closest('.kudo');
		endKudoing(k);
	}).live("touchstart", function(b) {
		var k = $(this).closest('.kudo');
		if (k.hasClass("kudoable")){
			startKudoing(k);
		}
		b.preventDefault();
		return false;
	}).live("touchend", function(b) {
		var k = $(this).closest('.kudo');
		endKudoing(k); 
		b.preventDefault();
		return false;
	});
	//TODO replace b with the event
	}
);
