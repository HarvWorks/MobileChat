import { AsyncStorage } from 'react-native';
export async function apiCall(navigate, body, path, token, viewGood, viewBad) {
    try {
        let response = await fetch('http://127.0.0.1:8000/' + path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let responseJson = await response.json();
        if (!responseJson.error && responseJson.data) {
            if (viewGood) {
                if (token == 'token') {
                    try {
                        await AsyncStorage.setItem('myChatToken', responseJson.token);
                    } catch (error) {
                        console.log(error);
                    }
                }
                navigate(viewGood)
            }
        }
        else {
            if (viewBad) {
                navigate(viewBad)
            }
        }
        return responseJson
    } catch(error) {
        if (viewBad) {
            navigate(viewBad)
        }
        return {error: true}
    }
}
