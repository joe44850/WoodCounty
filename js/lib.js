(function($) {
    var methods = {
        init : function(options) {
            var settings = {
                callback: function() {}
            };
        
            if ( options ) {
                $.extend( settings, options );
                }

            $(":jqmData(role='page')").each(function() {
                $(this).bind("swiperight", function() {
                    var nextPage = parseInt($(this).attr("id").split("page")[1]) - 1;
                    if (nextPage === 0) 
                        nextPage = 3;
                    
                    $.mobile.changePage("#page"+nextPage, {
                            transition: "slide",
                            reverse: false
                        });
                    });                        

                $(this).bind("swipeleft", function() {
                    var nextPage = parseInt($(this).attr("id").split("page")[1]) +1;
                    if (nextPage === 4) 
                        nextPage = 1;
                    
                    $.mobile.changePage("#page"+nextPage, {
                        transition: "slide",
                        reverse: true
                    });
                });
            })
        }
        }

    $.fn.initApp = function(method) {
        if ( methods[method] ) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } 
        else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } 
        else {
            $.error( 'Method ' + method + ' does not exist' );
        }
    }
    })(jQuery);

$(document).ready(function(){
    $().initApp();
});

function checkForData(){
		
}

function initHome(){
	val = LocalStorage.getStoreValue('first-name');
	val2 = LocalStorage.getStoreValue('last-name');	
	o_div = document.getElementById('main-content');
	if(!val || !val2){
		html = document.getElementById("default").innerHTML;			
	}
	else{
		html = document.getElementById("edit-version").innerHTML;
		html+=patientInfo();
		html+=document.getElementById('static-info').innerHTML;	
	}
	o_div.innerHTML = html;
	$(o_div).trigger("create");	
}

function patientInfo(){
	rows = LocalStorage.getInfoFromForm('patient-info');
	html = "<div><center>Patient Information</center>";
	z=0;
	for(i=0;i<rows.length;i++){
		row = rows[i];
		readable = makeReadable(row['key']);
		result = nl2br(row['value']);
		if(z==0){ bgcolor="#eee";z=1;}
		else{ bgcolor="#ddd";z=0;}
		html+="<div style='background-color:"+bgcolor+";padding:3px;'><span style='color:#555;'>"+readable+"</span> : <span><b>"+result+"</b></span></div>";
	}
	html+="</div>";
	return html;	
}

function updateMsg(div, text){
		
}

function makeReadable(str){
	newStr = str.replace(/-slash-/gi, "/");
	newStr = newStr.replace(/-/g, " ");	
	return toTitleCase(newStr);
}

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function pageUpdate(){
  initHome();
  LocalStorage.initForm('patient-info');	
}

function start() {
  LocalStorage.init();
  initHome();
  LocalStorage.initForm('patient-info');
}

function nl2br (str, is_xhtml) {	
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';   
    str = (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');   
    return str;
}
window.onload = start;
