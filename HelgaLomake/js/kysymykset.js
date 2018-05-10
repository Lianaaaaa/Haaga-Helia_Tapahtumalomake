	var questionnaire = [];
    $.getJSON( "http://proto304.haaga-helia.fi:8080/kyselypalvelu/surveys/2", function( data ) {
		var items = [];
        var questions = data.questions;	
        
			  $.each(questions, function (key, d) {
                questionnaire.push(d.id);
                
                if (d.questiontype == "radio") {
                    items.push("<br>" + "<b>" + d.kysymys + "</b>" + "<br />");
                    
                    for (i = 0; i < d.option.length; i++) {
                        items.push("<input style='margin-left: 10px; margin-top: 11px; margin-bottom: 10px;' type=" + d.questiontype + " id=" + d.id + " name=" + d.id + " option=" + d.option[i].text + ">" + d.option[i].text );
                    }};

                if (d.questiontype == "text") {
                    items.push("<b>" + d.kysymys + "</b>");
                    items.push("<br>" + "<input style='margin-left: 10px; margin-top: 10px;' type=" + d.questiontype + " id=" + d.id + "><br>");
                }
            });
        
            $( "<div/>", { html: items.join( "" ) } ).appendTo( "#lomake" );
				$('<input type="button" onclick="laheta()" style="margin-left: 25%; margin-top: 11px;" value="submit" />' ).appendTo( "#lomake" );
						});


				function laheta() {
					var sukupuoli;
							
					if( document.getElementById( "14_0" ).checked ) 
						sukupuoli = "Nainen";
					
					else if( document.getElementById( "14_1" ).checked ) 
						sukupuoli = "Mies";
					else if( document.getElementById( "14_2" ).checked ) 
						sukupuoli = "muu";
					else
						sukupuoli = "ei vastausta";
								
					var jsonData = { 
						"Monennen vuoden opiskelija?" : document.getElementById( "1" ).value,
						"Sukupuoli": sukupuoli,
						"MistÃ¤ tapahtumasta kyse?" : document.getElementById( "5" ).value,
						"Olitko tyytyvÃ¤inen tapahtumaan?" : annavastaus( "28_0", 1 ),
						"Hinta laatusuhde?" : annavastaus( "16_0", 2 ),
						"Olitko tyytyvÃ¤inen tapahtumaan" : annavastaus( "29_0", 2 ),
						"Oliko tapahtumapaikka hyvÃ¤?" : annavastaus( "18_0", 1 ),
						"Olisiko jokin voitu tehdÃ¤ toisin?" : document.getElementById( "8" ).value,
						"Osallistuisitko tapahtumaan uudestaan?" : annavastaus( "19_0", 1 ),
						"Osallistuitko tapahtumaan yksin vai ystÃ¤vien kanssa?" : annavastaus( "20_0", 2 ),
						"Saitko tapahtuman aikana uusia ystÃ¤viÃ¤?" : annavastaus( "21_0", 1 ),
							};
							
					jsonData = JSON.stringify( jsonData );
	
						$.ajax({
							url: 'http://proto304.haaga-helia.fi:8080/kyselypalvelu/saveanswer/2',
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