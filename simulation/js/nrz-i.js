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
		for(i=0;i<arr_databit.length;i++)
		{
			if(arr_databit[i]==="0" || arr_databit[i]==="1")
			{
				count++;
			}
		}

		//Checking if the user has not entered numerical voltage and proper databits

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
				text:"Please enter numerical value of voltage only, and binary databits only.",
				icon:'error'
				});
		
		}
		else if(!Number(voltage))            //check if voltage is not correct
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
				text:"Please enter numerical value of voltage only.",
				icon:'error'
				});
		
		}
		else if(!proper)                    //check if databits are not proper
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
				text:"Please enter binary databits only.",
				icon:'error'
				});
		
		}
		else
		{
			var x_axis=[];
			var y_axis = [];
			var i=0;
			var k=0;
			console.log(arr_databit);

			//initial setting when 0 then +ve voltage when 1 then -ve voltage

			if(arr_databit[0]=="0")
			{
				x_axis[k] = k;
				y_axis[k] = 1*voltage;
			}
			else
			{
				x_axis[k] = k;
				y_axis[k] = -1*voltage;
			}
			k++;


			for(var i=0;i<=arr_databit.length-1;i++)
			{
				if(i==0)    //set for 1st bit
				{
					if(arr_databit[0]=="0")
					{
						x_axis[k] = k;
						y_axis[k] = 1*voltage;
					}
					else
					{
						x_axis[k] = k;
						y_axis[k] = -1*voltage;
					}
				}
				else
				{
					if(arr_databit[i]=="0")       //According to NRZ-I if its 0 then no transition
					{
						x_axis[k] = k;
						y_axis[k] = y_axis[k-1];
					}
					else                          //if its 1 then it inverts
					{
						x_axis[k] = k;
						y_axis[k] = -1*y_axis[k-1];
					}
				}
				k++;
			}

			console.log(x_axis);
			console.log(y_axis);

			//Setting the specification for graph

			var trace4 = {
			  x: x_axis,
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
			plot_bgcolor:'#fff',
			paper_bgcolor:"#fff",
			};
			//calling plotly to plot the graph
			Plotly.newPlot('nrz_i', data, layout,{responsive: true});
		}

	}

};
