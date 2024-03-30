// Seleciona o container de imagens
var imageContainer = document.querySelector('.image-container');

// Usa a API Fetch para obter os dados do arquivo .txt
fetch('dados.txt')
    .then(response => response.text())
    .then(data => {
        // Divide os dados em linhas
        var lines = data.split('\n');

        // Percorre cada linha
        lines.forEach(function(line) {
            // Divide a linha em partes
            var parts = line.split(';');

            // Cria um objeto de imagem a partir das partes
            var image = {
                src: "fotos/" + parts[0] + ".jpg",
                date: parts[1],
                location: parts[2]
            };

            // Cria os elementos HTML para a imagem
            var imageWrapper = document.createElement('div');
            imageWrapper.className = 'image-wrapper';

            var img = document.createElement('img');
            img.src = image.src;

            var imageInfo = document.createElement('div');
            imageInfo.className = 'image-info';

            var imageDate = document.createElement('div');
            imageDate.className = 'image-date';
            if (image.date != "?") {
                imageDate.innerHTML = '<i class="fas fa-calendar-alt"></i> ' + image.date;
            }

            var imageLocation = document.createElement('div');
            imageLocation.className = 'image-location';
            imageLocation.innerHTML = '<i class="fas fa-map-pin"></i> ' + image.location;

            var imageCaption = document.createElement('div');
            imageCaption.className = 'image-caption';
            if (parts.length > 3) {
                imageCaption.innerHTML = parts[3];
            }
           

            // Adiciona os elementos ao DOM
            imageInfo.appendChild(imageDate);
            imageInfo.appendChild(imageLocation);
            imageInfo.appendChild(imageCaption);
            imageWrapper.appendChild(img);
            imageWrapper.appendChild(imageInfo);
            imageContainer.appendChild(imageWrapper);
            // Adiciona um ouvinte de eventos à imagem
            img.addEventListener('click', function() {
                var index = Array.prototype.indexOf.call(imageContainer.children, imageWrapper) + 1;
                window.location.href = 'carrossel.html?image=' + index;
            });
        });
    })
    .catch(error => console.error('Error:', error));

