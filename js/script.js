$(function()
{
	//Para generar la ecuación de la respuesta a buscar...
	var respuesta = 0;
	var numCifras = 2;
	var contCorrectas = 0;
	var tiempo = 0; //Para saber si el tiempo se ha inicializado...
	var cuentaTiempo = 15;
	//Para generar la ecuación en función del resultado dado...
	
	var ecuacionAdivina = function()
	{		
		var operacion = "";
		if(numCifras >= 2)
		{
			var signoOpera = ["+", "-"];
			do
			{
				operacion = "";
				for(var i = 1; i <= numCifras; i++)
				{
					operacion += Math.floor(Math.random() * 3) + 1;
					if(i < numCifras)
					{
						operacion += " " + signoOpera[Math.floor(Math.random() * 2)] + " ";
					}
				}
				var valor = eval(operacion);
				if(valor === respuesta)
				{
					break;
				}				
			}while(1);			
		}
	
	return operacion;

	};		
	for(var i = 1; i <= 3; i++)
	{
		$("#respuesta_" + i).click(function(event) {
			var ind = Number(this.id.split("_")[1]);			
			validarRespuesta(ind);
		});

	}
	var validarRespuesta = function(ind)
	{
		clearInterval(tiempo);	
		if (respuesta === ind) {
					console.log(ind);				
					swal("Correcto", "la respuesta es correcta", "success");				
					contCorrectas++;
					console.log("Correctas..."+contCorrectas);
					$("#titulo").html("Sumando (0"+contCorrectas+")");					
					nuevoJuego();			
				}
				else
				{														
					swal("Incorrecto", "la respuesta no es correcta", "error");
					$("#ecuacion").delay(2000).fadeOut('slow', function() {
						location.reload();
					});														
				}
	};
	//Para iniciar un nuevo Juego...
	var nuevoJuego = (function nuevoJuego()
	{			
		if(contCorrectas === 10)
		{
			swal("Ganaste", "Eres muy bueno calculando", "success");
			$("#ecuacion").delay(2000).fadeOut('slow', function() {
				location.reload();
			});		
		}
		cuentaTiempo = 15; 	
		tiempo = setInterval(function(){
		cuentaTiempo--;
			$("#tiempo").html("Tiempo: " + cuentaTiempo);
			if(cuentaTiempo <= 0)
			{	
					swal("Perdiste", "Se ha terminado el tiempo", "error");
					$("#ecuacion").delay(2000).fadeOut('slow', function() {
						location.reload();
					});			
				//validarRespuesta(0);
			}
		}, 1000);		
		if(contCorrectas % 2 === 0 && contCorrectas !== 0)
		{
			numCifras++;
		}
		respuesta = Math.floor(Math.random() * 3) + 1;
		$("#ecuacion").html(ecuacionAdivina() + " = ?");
		return  nuevoJuego;
	})();
});