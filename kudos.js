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


function startKudoing(element) {
	element.oldKudoText = element.children("p.count").html();
	element.children("p.count").hide();
	//element.append('<p class="count notice"><span class="dont-move">Giving Kudos...</span></p>');
	element.addClass("filling").removeClass("animate");
	element.parent("figure").addClass("filling");
	element_id = element.attr('id')
	setTimeout("sendKudo('" + element_id +"')", 700 );
}
function endKudoing(element) {
	
	if (element.hasClass("kudoable")){
		element.removeClass("filling").addClass("animate");
		element.parent("figure").removeClass("filling");
		element.children("p.count").show();
		//element.children("p.notice").remove();
		element.children("p.count").fadeIn("slow");
	}
	
}
// whatever it is.
function sendKudo(element_id) {
	var element = $("#"+element_id);
	if (element.hasClass('kudoable') && element.hasClass("filling") ){
		element.flag = true; 
		element.article = element.closest("article").attr("id");
		sendKudoInfoToServer(element_id);
		element.removeClass("animate").removeClass("kudoable").removeClass("filling").addClass("completed");
		element.parent("figure").removeClass("filling");
		$.cookie(element.article, true);
		var count = $('#'+element_id+'-count');
		newnum = parseInt(count.text()) + 1;
		count.html(newnum);
		//element.children("p.notice").hide().remove();
		element.children("p.count").show();
		count.fadeIn();
	}
}


$(function() {


	$("a.kudos").each(function(e) {
		// test if they've already left a kudo for each article by 
		// checking their cookies. 
		// TODO: this WILL fail when you hit the max number of cookies for a site.
		// remove their ability to give it a kudo if they've already done so.
		var id = $(this).closest("article").attr("id");
		if ($.cookie(id)){
			$(this).removeClass("animate").removeClass("kudoable").addClass("completed");
		} // otherwise the cookie is null and they haven't given a kudo
	});
	$.kudo = {};
	$.kudo.flag = false; 
	$.kudo.article = false;
	
	$("a.kudos").click(function(e) {
			e.preventDefault();
			return false;
		});
	
	$("a.kudos").mouseenter(function() {
			var k = $(this);
			if (k.hasClass("kudoable")){
				startKudoing(k);
			}
		}).mouseleave(function() {
				var k = $(this);
				endKudoing(k);
			});
	$("a.kudos").live("touchstart", function(b) {
			var k = $(this);
			if (k.hasClass("kudoable")){
				startKudoing(k);
			}
			b.preventDefault();
			return false;
		});
	//TODO replace b with the event
	$("a.kudos").live("touchend", function(b) {
			var k = $(this);
			endKudoing(k); 
			b.preventDefault();
			return false;
		});
	}
);
