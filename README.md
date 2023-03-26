<!DOCTYPE html>
<html>
<head>
	<title>Ejemplo de tabla dinámica con JSON</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style>
		table {
			font-family: Arial, sans-serif;
			border-collapse: collapse;
			width: 100%;
			max-width: 800px;
			margin: 20px auto;
		}

		th, td {
			text-align: left;
			padding: 8px;
			border-bottom: 1px solid #ddd;
		}

		tr:hover {
			background-color: #f5f5f5;
		}

		th {
			background-color: #4CAF50;
			color: white;
		}
	</style>
</head>
<body>

	<h1>Ejemplo de tabla dinámica con JSON</h1>

	<table>
		<thead>
			<tr>
				<th>Rótulo</th>
				<th>Municipio</th>
				<th>Dirección</th>
			</tr>
		</thead>
		<tbody id="tabla-dinamica"></tbody>
	</table>

    <script>
		document.addEventListener('DOMContentLoaded', () => {
			// Carga el archivo JSON
			fetch('./gasolineras_cercanas.json')
				.then(response => response.json())
				.then(data => {
					// Recorre los datos del JSON y crea las filas de la tabla
					data.forEach(p => {
						const fila = document.createElement('tr');
						const Rotulo = document.createElement('td');
						Rotulo.textContent = p.Rotulo;
						const Municipio = document.createElement('td');
						Municipio.textContent = p.Municipio;
						const Direccion = document.createElement('td');
						Direccion.textContent = p.Direccion;
						fila.appendChild(Rotulo);
						fila.appendChild(Municipio);
						fila.appendChild(Direccion);
						document.getElementById('tabla-dinamica').appendChild(fila);
					});
				});
		});
	</script>

</body>
</html>
