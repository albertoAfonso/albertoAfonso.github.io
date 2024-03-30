fetch('dados.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.text();
    })
    .then(data => {
        var imageUrls = data.split('\n');
        var imageContainer = document.querySelector('.carousel');
        var thumbnailContainer = document.querySelector('.carousel-thumbnails');

        for (var i = 0; i < imageUrls.length; i++) {
            var parts = imageUrls[i].split(';');
           
            var img = document.createElement('img');
            img.src = "fotos/" + parts[0] + ".jpg";
            img.classList.add('carousel-image');
            imageContainer.appendChild(img);

            var thumbnail = img.cloneNode(true);
            thumbnail.classList.remove('carousel-image');
            thumbnail.classList.add('carousel-thumbnail');
            thumbnailContainer.appendChild(thumbnail);
        }

        var images = document.querySelectorAll('.carousel-image');
        var thumbnails = document.querySelectorAll('.carousel-thumbnail');

        // Get the 'image' parameter from the URL
        var params = new URLSearchParams(window.location.search);
        var imageParam = params.get('image');

        // Use the 'image' parameter as the current index, or default to 0
        var currentIndex = imageParam ? parseInt(imageParam) - 1 : 0;

        function updateCarousel() {
            for (var i = 0; i < images.length; i++) {
                if (i === currentIndex) {
                    images[i].classList.add('active');
                    thumbnails[i].classList.add('active');
                } else {
                    images[i].classList.remove('active');
                    thumbnails[i].classList.remove('active');
                }
            }
        }

        document.querySelector('.carousel-button.previous').addEventListener('click', function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }
            updateCarousel();
        });

        document.querySelector('.carousel-button.next').addEventListener('click', function() {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            updateCarousel();
        });

        updateCarousel();
    })
    .catch(error => console.error('Error:', error));