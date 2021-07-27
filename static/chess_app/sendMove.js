function getCSRFCookie(allCookies) {
    const cookieList = allCookies.split(';');
    for (const cookieIdx in cookieList) {
        const cookie = cookieList[cookieIdx].trim();
        const keyValuePair = cookie.split('=');
        if (keyValuePair[0].trim() === 'csrftoken') {
            return keyValuePair[1].trim()
        }
    }
}


export default async function sendMove(move) {
    const csrfCookie = getCSRFCookie(document.cookie);

    try {
        const response = await fetch('/chess/move', {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfCookie
            },
            body: JSON.stringify(move)
        })
        const jsonResponse = await response.json()
        return jsonResponse;
    } catch (err) {
        console.log(err)
    }
}
