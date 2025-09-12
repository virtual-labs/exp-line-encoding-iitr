$(document).ready(function () {

	plot();
	$('#data_bit, #voltage').on("submit", plot);
})

function plot(){


	//Reading the value of databits and voltage
	var data_bit = $('#data_bit').val();
	var voltage = $("#voltage").val();

	//Checking if the user has not entered the databits and voltage

	if(data_bit==="" && voltage==="")
	{
		Swal.fire({
            backdrop:false,
           target: '#alerts',
           width:'370px',
           position:'center',
            customClass: {
              container: 'position-absolute',
              popup:"swal2-popup"
            },
            text:"Please enter data bits and voltage.",
            });
	
	}
	else if(data_bit==="")  //Checking if the user has not entered the databits
	{
		Swal.fire({
            backdrop:false,
           target: '#alerts',
           width:'370px',
           position:'center',
            customClass: {
              container: 'position-absolute',
              popup:"swal2-popup"
            },
            text:"Please enter data bits.",
            });
		
	}
	else if(voltage==="")    //Checking if the user has not entered the voltage
	{
		Swal.fire({
            backdrop:false,
           target: '#alerts',
           width:'370px',
           position:'center',
            customClass: {
              container: 'position-absolute',
              popup:"swal2-popup"
            },
            text:"Please enter voltage.",
            });
	
	}
	else
	{
		console.log(data_bit);
		console.log(voltage);
		arr_databit = data_bit.toString();
		var proper = true;
		var count=0;

		//Checking if the user has entered only 0s and 1s as databits and numerical value of voltage

		for(i=0;i<arr_databit.length;i++)
		{
			if(arr_databit[i]==="0" || arr_databit[i]==="1")
			{
				count++;
			}
		}
		if(count!==arr_databit.length)
		{
			proper=false;
		}
		if(!Number(voltage) && !proper)
		{
			Swal.fire({
				backdrop:false,
			   target: '#alerts',
			   width:'400px',
			   position:'center',
				customClass: {
				  container: 'position-absolute',
				  popup:"swal2-popup"
				},
				title:'Oops...',
				icon:'error',
				text:"Please enter numerical value of voltage only, and binary databits only.",
				});
			
		}
		else if(!Number(voltage))   //check if voltage is not correct
		{
			Swal.fire({
				backdrop:false,
			   target: '#alerts',
			   width:'400px',
			   position:'center',
				customClass: {
				  container: 'position-absolute',
				  popup:"swal2-popup"
				},
				title:'Oops...',
				icon:'error',
				text:"Please enter numerical value of voltage only.",
				});
			
		}
		else if(!proper)  //check if databits are not proper
		{
			Swal.fire({
				backdrop:false,
			   target: '#alerts',
			   width:'400px',
			   position:'center',
				customClass: {
				  container: 'position-absolute',
				  popup:"swal2-popup"
				},
				title:'Oops...',
				icon:'error',
				text:"Please enter binary databits only.",
				});
			
		}
		else
		{
			var x_axis=[];
			var y_axis = [];
			var i=0;
			var k=0;



			if(arr_databit[0]=="0")
			{
				x_axis[k] = k;
				y_axis[k] = 0*voltage;
				k++;
			}
			else
			{
				x_axis[k] = k;
				y_axis[k] = 0*voltage;
				k++;

			}

			for(var i=0;i<arr_databit.length;i++)
			{
				if(arr_databit[i]=="1")
				{
				x_axis[k] = k;
				y_axis[k] = 1*voltage;
				k++;
				x_axis[k] = k;
				y_axis[k] = 0*voltage;
				k++;

				}
				else
				{
				x_axis[k] = k;
				y_axis[k] = 0*voltage;
				k++;
				x_axis[k]=k;
				y_axis[k]= 0*voltage;
				k++;
				}

			}

			console.log(x_axis);
			console.log(y_axis);
			var copy_x_axis = [];
			var pos=0.5;
			copy_x_axis[0]=0;

			//setting graph to transit at the middle

			for(var i=0;i<x_axis.length;i++)
			{
				if(i!=0)
				{
					copy_x_axis[i]=pos;
					console.log(copy_x_axis[i]);
					pos+=0.5;
				}
			}

			//setting graph specifications

			var trace4 = {
			  x: copy_x_axis,
			  y: y_axis,
			  mode: 'lines+markers',
			  name: 'vh',
			  line: {shape: 'vh'},
			  type: 'scatter'
			};


			var data = [trace4];

			var layout = {legend: {
				y: 0,
				traceorder: 'reversed',
				font: {size: 16},
				yref: 'paper'
			},
			plot_bgcolor:'white',
			paper_bgcolor:"white",
			};
			//calling plotly to plot the graph
			Plotly.newPlot('rz-uni', data, layout,{responsive: true});
		}

	}

}
