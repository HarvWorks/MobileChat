import { AsyncStorage } from 'react-native';

export async function apiCall(navigate, body, path, method, token, viewGood, viewBad) {
    let request = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }
    if (method != 'GET' && method != 'HEAD') {
        request['body'] = JSON.stringify(body)
    }
    try {
        let response = await fetch('http://127.0.0.1:8000/' + path, request);
        let responseJson = await response.json();
        if (!responseJson.error && responseJson.data) {
            if (viewGood) {
                if (token == 'token') {
                    try {
                        await AsyncStorage.setItem('chatToken', responseJson.token);
                        await AsyncStorage.setItem('userData', JSON.stringify(responseJson.data));
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
        console.log('error: ' + error);
        return {error: true}
    }
}
