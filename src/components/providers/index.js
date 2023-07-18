const baseApiUrl = 'https://emojihub.yurace.pro/api/all'

async function getEmojis() {
    const response = await fetch(baseApiUrl);
    const emojis = await response.json();
     console.log(emojis);
    
    return emojis
}

export default getEmojis