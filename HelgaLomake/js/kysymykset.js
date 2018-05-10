	$.getJSON( "http://www.mocky.io/v2/5ae9b9b63000005a005db18c", function( data ) {
		var items = [];
				
			$.each( data, function( key, d ) {
			items.push("<br />" + "<b>" + d.kysymys + "</b>" + "<br />");
					  
				if (d.tyyppi=="text")
					items.push("<input type=text style='margin-left: 10px; margin-top: 10px;' id='" + d.id + "'>" + "<br>" );
				
				if (d.tyyppi=="radio") 
					for (i = 0; i < d.value.length; i++) 
					items.push("<input style='margin-left: 10px; margin-top: 11px; margin-bottom: 10px;' type=" + d.tyyppi + " id= "+ d.id +"_" + i + " name=" + d.id + "value="+ d.value[i] + ">" + d.value[i]);
						});
							
				$( "<div/>", { html: items.join( "" ) } ).appendTo( "#lomake" );
				$('<input type="button" onclick="laheta()" style="margin-left: 25%; margin-top: 11px;" value="submit" />' ).appendTo( "#lomake" );
						});

				function laheta() {
					var sukupuoli;
							
					if( document.getElementById( "2_0" ).checked ) 
						sukupuoli = "Nainen";
					
					else if( document.getElementById( "2_1" ).checked ) 
						sukupuoli = "Mies";
					else if( document.getElementById( "2_2" ).checked ) 
						sukupuoli = "muu";
					else
						sukupuoli = "ei vastausta";
								
					var jsonData = { 
						"Monennen vuoden opiskelija?" : document.getElementById( "1" ).value,
						"Sukupuoli": sukupuoli,
						"MistÃ¤ tapahtumasta kyse?" : document.getElementById( "3" ).value,
						"Olitko tyytyvÃ¤inen tapahtumaan?" : annavastaus( "4_0", 1 ),
						"Hinta laatusuhde?" : annavastaus( "5_0", 2 ),
						"Olitko tyytyvÃ¤inen tapahtumaan" : annavastaus( "6_0", 2 ),
						"Oliko tapahtumapaikka hyvÃ¤?" : annavastaus( "7_0", 1 ),
						"Olisiko jokin voitu tehdÃ¤ toisin?" : document.getElementById( "8" ).value,
						"Osallistuisitko tapahtumaan uudestaan?" : annavastaus( "9_0", 1 ),
						"Osallistuitko tapahtumaan yksin vai ystÃ¤vien kanssa?" : annavastaus( "10_0", 2 ),
						"Saitko tapahtuman aikana uusia ystÃ¤viÃ¤?" : annavastaus( "11_0", 1 ),
							};
							
					jsonData = JSON.stringify( jsonData );
	
						$.ajax({
							url: 'http://www.mocky.io/v2/5ae9b9b63000005a005db18c',
							type: 'POST',
							dataType: 'json',
							data: jsonData, 
							success: function() { alert( "DATA: " + jsonData ); }
							});
						}
						
					function annavastaus( elementti, kyllaei ) {
						var elm = document.getElementById( elementti );
						var vastkyl = "";
						var vastei = "";
							
						if( kyllaei == 1 ) {
							vastkyl = "KyllÃ¤";
							vastei = "Ei";
						}
						else if( kyllaei == 2 ) {
							vastkyl = "HyvÃ¤";
							vastei = "Huono";
						}
						else {
							vastkyl = "Yksin";
							vastei = "RyhmÃ¤ssÃ¤";
						}
							
						if( elm.checked )
							return vastkyl;
						else
							return vastei;
						}