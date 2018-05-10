	$.getJSON( "http://www.mocky.io/v2/5ae9b9b63000005a005db18c", function( data ) {
		var items = [];
				
			$.each( data, function( key, d ) {
			items.push("<br />" + "<b>" + d.kysymys + "</b>");
					  
				if (d.tyyppi=="text")
					items.push("<input type=text id='" + d.id + "'>" + "<br>" );
				
				if (d.tyyppi=="radio") 
					for (i = 0; i < d.value.length; i++) 
					items.push("<input type=" + d.tyyppi + " id= "+ d.id +"_" + i + " name=" + d.id + "value="+ d.value[i] + ">" + d.value[i]);
						});
							
				$( "<div/>", { html: items.join( "" ) } ).appendTo( "#lomake" );
				$('<input type="button" onclick="laheta()" value="submit" />' ).appendTo( "#lomake" );
						});

				