from PIL import Image

# Caminho da imagem original
input_path = "logo.png"
output_path = "logo_mobile_512.png"

# Abrir a imagem original
original_image = Image.open(input_path)

# Redimensionar para 512x512 mantendo o fundo transparente
resized_image = original_image.resize((512, 512), Image.LANCZOS)

# Salvar a imagem redimensionada
resized_image.save(output_path, format="PNG")

print(f"Image resized and saved to: {output_path}") 