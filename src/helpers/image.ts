const CLOUDINARY_CONFIG = {
  cloudName: 'cimen11dev',
  uploadPreset: 'helfbr7e',
}

export const uploadImage = async ({ base64 }: { base64: string }): Promise<string> => {
  const data = new URLSearchParams()
  data.append('file', base64)
  data.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset)
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`, {
    method: 'POST',
    body: data,
  })
  const resJson = await response.json()
  return resJson.secure_url
}
