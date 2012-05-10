
	function startKudoing(element) {
		element.oldKudoText = element.children("p.count").html();
		element.children("p.count").hide();
		element.append('<p class="count notice"><span class="dont-move">Don\'t move...</span></p>');
		element.addClass("filling").removeClass("animate");
		element.parent("figure").addClass("filling");
		sendKudo(a);
	}
	function endKudoing(element) {
		
		if (element.hasClass("kudoable")){
			element.removeClass("filling").addClass("animate");
			element.parent("figure").removeClass("filling");
			element.children("p.count").hide().html(element.oldKudoText);
			element.children("p.notice").remove();
			element.children("p.count").fadeIn("slow");
		}
		
	}
	//todo replace b with ... event / element
	// whatever it is.
	function sendKudo(element) {
		element.flag = !0, 
		element.article = element.closest("article").attr("id"),
		$.post("/kudos.php", {
								article: element.article,cooking: h
							}),
		element.removeClass("animate").removeClass("kudoable").removeClass("filling").addClass("completed");
		element.parent("figure").removeClass("filling");
		$.cookie(element.article, true);
		newnum = parseInt(element.oldKudoText) + 1;
		element.newtext = newnum + " " + '<span class="identifier">Kudos</span>';
		element.children("p.notice").hide().remove();
		element.children("p.count").html(element.newtext).fadeIn();
	}

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
	//TODO replace b with the event
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
