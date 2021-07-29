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


async function sendData(path, data) {
    const csrfCookie = getCSRFCookie(document.cookie);

    try {
        const response = await fetch(path, {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfCookie
            },
            body: JSON.stringify(data)
        })
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (err) {
        console.log(err)
    }
}


export async function sendMove(move) {
    return await sendData('/chess/move/', move);
}

export async function requestLegalMoves(selectedPiece) {
    return await sendData('/chess/legalmoves/', selectedPiece);
}
