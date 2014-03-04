//Defining the data structure for the Questionnaire through a container object.
var data={
	'info':{
		'name':'',
		'org':'',
		'role':'',
		'invo':'',
		'time':''
	},
	'people':[
		['Andreas Feiersinger'],
		['Martin Skiggs'],
		['Andrew Spalding'],
		['Andy Swift'],
		['Barry Franklin'],
		['Bob Townroe  '],
		['Clive Appleyard'],
		['Danny Duggan'],
		['Kirti Patel'],
		['Eric Parry'],
		['Chris Kilpatrick'],
		['Ian Watkins'],
		['Vince Mondesir'],
		['Jamie Bell'],
		['Jenny Hamilton'],
		['John Chantler'],
		['Jon Colclough'],
		['Ka-Ho Li'],
		['Keith Bowers'],
		['Martin Roach'],
		['Neil Moss'],
		['Olly Newman'],
		['Paul Drydon'],
		['Gary Pollinger'],
		['Roger Hewitt'],
		['Samuel Palomo'],
		['Simon Addyman'],
		['Shaun Russell'],
		['Richard Nicholl'],
		['Tim Cooper'],
		['Toby Nicholson'],
		['Viki James'],
		['Martin Edwards'],
		['Harsh Lad'],
		['David Adams'],
		['Phil Hallinan'],
		['Mohamed Mukhred'],
		['Mark Hinde'],
		['Gareth Wilson'],
		['Gabrielle Coyle'],
		['Stephen Shires'],
		['Gary Cole'],
		['Jacqueline McDonagh'],
		['Bob Shrubb'],
		['Michael Smith'],
		['Paul Berry'],
		[''],
		[''],
		[''],
		[''],
		['']
	]
};

//Setting the slider activation switch
var sliderdone = 0;

//Registering a Callback for the successful completion of the HTML page.
$(document).ready(function(){
	//Activating the tooltips.
	$('.ttp').tooltip();

	// Adding the search behaviour to the search box
	$("#search").keyup(function(){var value=this.value.toLowerCase().trim();$("table tr").each(function(index){if(!index){return};$(this).find("td").each(function(){var id=$(this).text().toLowerCase().trim();var not_found=(id.indexOf(value)==-1);$(this).closest('tr').toggle(!not_found);return not_found;});});});

	// Adding the rows in the table based on the container object.
	var string2='</td>'+
			'<td style="text-align:center;"><input class="sli6"></td>'+
			'<td style="text-align:center;"><input class="sli"></td>'+
			'<td style="text-align:center;"><input class="sli"></td>'+
			'<td style="text-align:center;"><input class="sli"></td>'+
			'<td style="text-align:center;"><input class="sli"></td>'+
			'<td style="text-align:center;"><input class="sli"></td>'+
			'<td style="text-align:center;"><input class="sli"></td>'+
		'</tr>';
	var tb='';
	for(i in data.people){
		if(data.people[i][0]!=''){
			tb+='<tr id="'+i+'"><td><input class="che" type="checkbox"></td><td>'+'<div class="othnam">'+data.people[i][0]+'</div>'+string2;
		}else{
			tb+='<tr id="'+i+'"><td><input class="che" type="checkbox"></td><td>'+'<input class="form-control othnam" type="text">'+string2;
		}
	}
	$('tbody').append(tb);


	//Setting the Check box behaviour - switching the corresponding sliders on and off.
	$('.che').change(function(){
		$(this).parent().nextAll().children('.slider').toggle();
		$(this).parent().parent().insertAfter($("table tr:first"));
		syncData();
	});

	//Adding realtime data update to other name inputs.
	$('input.othnam').keyup(function(){
		if($(this).val()==''){
			$(this).parent().parent().children().children('.che')[0].checked = false;
			$(this).parent().parent().children().children('.slider').hide();
		}else{
			$(this).parent().parent().children().children('.che')[0].checked = true;
			$(this).parent().parent().children().children('.slider').show();
		}
		syncData();
	});

	//Adding the behaviour to the involved? input field to show and hide the table.
	$('#invo').change(function(){
		if($(this).val()==1 && sliderdone == 0) {
			//Activating, fomatting and defining behaviour for all the sliders
			$('.sli6').slider({min:1,max:6,step:1,orientation:'horizontal',value:3,tooltip:'hide'}).on('slide',function(){
				$($(this).parent().children().children('.slider-handle')[0]).text($(this).data('slider').getValue());
				syncData();
			});
			$('.sli').slider({min:1,max:5,step:1,orientation:'horizontal',value:3,tooltip:'hide'}).on('slide',function(){
				$($(this).parent().children().children('.slider-handle')[0]).text($(this).data('slider').getValue());
				syncData();
			});
			$('.slider').css('width','90px').toggle();
			sliderdone = 1;
		}
		$('.table-responsive').toggle();
		$('#tableinst').toggle();
		$('#time').parent().toggle();
		syncData();
	});

	//All the other fields have 
	$('.update').keyup(function(){
			syncData()
	});

	//Switching off the table and time input by default
	$('.table-responsive').toggle();
	$('#tableinst').toggle();
	$('#time').parent().toggle();

	//Adding post behaviour to the submit button..
	$('#submitbutton').click(function(){
		$('#submitbutton').text('Wait...')
		$.ajax({
			url: "../lib/push.php",
			type: "POST",
			cache: false,
			data: ({ 
				table:'bankcle',
				name:data.info.name,
				org:data.info.org,
				role:data.info.role,
				invo:data.info.invo,
				time:data.info.time,
				people:JSON.stringify(data.people)
			}),
			success: function(x){
				if(x=='"success"'){
					$('#submitbutton').removeClass('btn-primary');
					$('#submitbutton').removeClass('btn-warning');
					$('#submitbutton').addClass('btn-success');
					$('#submitbutton').text('Succesfully Submitted')
					setTimeout(function(){
						location.reload();
					},1500)
				} else {
					$('#submitbutton').removeClass('btn-primary');
					$('#submitbutton').removeClass('btn-success');
					$('#submitbutton').addClass('btn-warning');
					$('#submitbutton').text('Error - Try Again');
				}
			}
		});
	});

	$('#start').modal('toggle');
});

//Function to keep the data variable updated in line with what is shown on the scree.
function syncData(){
	if(sliderdone==1){
		for(i in data.people){
			if($('#'+i).children().children('.othnam').get(0).tagName=="DIV"){
				data.people[i][0]=$('#'+i).children().children('.othnam').text();
			}else{
				data.people[i][0]=$('#'+i).children().children('.othnam').val();
			}		
			data.people[i][1]=$('#'+i).children().children('.che')[0].checked;
			data.people[i][2]=$('#'+i).children().children().children('.sli6').data('slider').getValue();
			for(var j=3;j<9;j++){
				data.people[i][j]=$($('#'+i).children().children().children('.sli')[j-3]).data('slider').getValue();
			}
		}
	}
	data.info.name = $('#name').val();
	data.info.org = $('#org').val();
	data.info.role = $('#role').val();
	data.info.invo = $('#invo').val();
	data.info.time = $('#time').val();
}