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
			if(count!==arr_databit.length)
			{
				proper=false;
			}

			//Checking if the user has not entered numerical voltage and proper databits
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
			else if(!Number(voltage))  //check if voltage is not correct
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
			else if(!proper)           //check if databits are not proper
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
				console.log(arr_databit);
				var x_axis=[];
				var y_axis = [];
				var i=0;
				var k=0;

				//Initial Setting for time=0


				if(arr_databit[0]==0)           //According to NRZ-L if databit is 0
				{                               //Then y-axis should have positive voltage
					x_axis[k] = k;
					y_axis[k] = 1*voltage;
				}
				else                             //If databit is 1 the y-axis should have
				{                                //negative voltage
					x_axis[k] = k;
					y_axis[k] = -1*voltage;
				}
				k++;

				//For every databit NRZ-L rules are followed


				for(var i=0;i<arr_databit.length;i++)
				{
					if(arr_databit[i]==1)
					{
						x_axis[k] = k;
						y_axis[k] = -1*voltage;
					}
					else
					{
						x_axis[k] = k;
						y_axis[k] = 1*voltage;
					}
					k++;
				}

				console.log(x_axis);
				console.log(y_axis);

				//settings done to plot the graph

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
				plot_bgcolor:'white',
				paper_bgcolor:"white",
				};
				//calling plotly to plot the graph
				Plotly.newPlot('nrz_l', data, layout,{responsive: true});
			}
		}

}
