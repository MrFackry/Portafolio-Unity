// js/cloudinary.js
function mostrarWidgetDeSubida() {
    cloudinary.openUploadWidget(
        {
            cloudName: "drve9qd5a",
            uploadPreset: "Protafolio-img"
        },
        (error, result) => {
            if (!error && result && result.info && result.info.secure_url) {
                document.getElementById('imageUrl').value = result.info.secure_url;
            } else if (error) {
                console.error('Error al subir la imagen:', error);
            }
        }
    );
}

export { mostrarWidgetDeSubida };