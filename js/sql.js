var LocalStorage = {
	
	init : function(){
		if(Modernizr.localstorage){
			
		}
		else{
			$('#message').text("Unfortunately your browser doesn't support local storage");		   
		    $('#message').show();
		}
	},
	
	storeData : function(inputid, val){		
		if(!inputid){ return false;}		
		o_input = document.getElementById(inputid);			
		localStorage.setItem(o_input.id, val);
		LocalStorage.getStoreValue(o_input.id);		
	},
	
	getStoreValue : function(item_id) {		
	    var item = localStorage.getItem(item_id);
	    if (item == null) {
	        item = '';
	    }
	    else if (item.length === 0) {
	        item = '';
	    }
	    return item;	   
	},
	
	setFormValues : function(f){
		o_form = this.o_form;
		for(i=0;i<o_form.elements.length;i++){
			el = o_form.elements[i];
			input_id = el.id;
			val = $(el).val();			
			this.storeData(input_id, val);
		}
	},
	
	initForm : function(form_id){		
		o_form = document.getElementById(form_id);		
		for(i=0;i<o_form.elements.length;i++){
			el = o_form.elements[i];
			input_id = el.id;
			valu =  this.getStoreValue(input_id);
			$(el).val(valu);
		}
	},
	
	getInfoFromForm : function(form_id){
		retval = new Array();
		o_form = document.getElementById(form_id);
		for(i=0;i<o_form.elements.length;i++){
			el = o_form.elements[i];
			input_id = el.id;
			valu =  this.getStoreValue(input_id);
			retval[i] = new Array();
			retval[i]['key'] = input_id;
			retval[i]['value'] = valu;
		}
		return retval;
	},
	
	submit : function(form_id){
		this.o_form = document.getElementById(form_id);
		LocalStorage.setFormValues();
		o_form = this.o_form;
		$(o_form).animate({opacity:.2}, function(){
			
			$(o_form).animate({opacity:1});
		});			
	}
	
}