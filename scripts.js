window.addEventListener('load', function () {
  var images = [
    {
      name: 'JPG',
      format: '.jpg',
    },
    {
      name: 'PNG',
      format: '.png',
    },
    {
      name: 'GIF',
      format: '.gif',
    },
    {
      name: 'SVG',
      format: '.svg',
    },
    {
      name: 'ICO',
      format: '.ico',
    },
    {
      name: 'WEBP',
      format: '.webp',
    },
    {
      name: 'APNG',
      format: '.apng',
    },
    {
      name: 'TIFF',
      format: '.tiff',
    },
    {
      name: 'BMP',
      format: '.bmp',
    },
    {
      name: 'XBM',
      format: '.xbm',
    },
    {
      name: 'EMF',
      format: '.emf',
    },
    {
      name: 'WMF',
      format: '.wmf',
    },
    {
      name: 'AVIF',
      format: '.avif',
    },
    {
      name: 'PDF',
      format: '.pdf',
    },
  ]
  var counter = 0

  images.forEach(function (image) {
    processImage(image, function (isSupported) {
      image.isSupported = isSupported
      counter++
      if (counter === images.length) {
        renderList(images)
      }
    })
  })
})

function processImage(image, callback) {
  var ImageNode = new Image()
  ImageNode.src = 'images/1px' + image.format

  ImageNode.onload = function () {
    callback(!!ImageNode.height)
  }

  ImageNode.onerror = function () {
    callback(false)
  }
}

function renderList(images) {
  var Loader = document.getElementById('loader')
  Loader.remove()

  if ('content' in document.createElement('template')) {
    var AppNode = document.querySelector('#app')
    var ImageTemplate = AppNode.querySelector('#template-image')

    images.forEach(function (image) {
      var ImageItem = ImageTemplate.content.cloneNode(true)
      var ImageIcon = ImageItem.querySelector('.image-icon')
      var ImageName = ImageItem.querySelector('.image-name')
      var ImageLabel = ImageItem.querySelector('.image-label')

      ImageIcon.textContent = image.format
      if (!!image.isSupported) {
        ImageIcon.classList.add('supported')
      }
      ImageName.textContent = image.name
      ImageLabel.textContent = !!image.isSupported ? 'is' : 'is not'
      ImageLabel.textContent += ' supported by your browser'

      AppNode.appendChild(ImageItem)
    })
  } else {
    // TODO: Add support for wooden browsers. (no)
  }
}
