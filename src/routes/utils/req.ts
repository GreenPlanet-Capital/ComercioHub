import { SERVER_URL } from "./constants";

export async function makeRequest(
    endpoint: string,
    reqBody: any,
    queryBody: any,
    isFormData: boolean
) {
    let response;
    queryBody = queryBody || {};

    const [token] = [
        localStorage.getItem("token"),
    ];
    const headers: any = { Authorization: `Bearer ${token}` };

    if (reqBody === null) {
        response = fetch(
            `${SERVER_URL}/${endpoint}` +
            (Object.keys(queryBody).length !== 0
                ? "?" + new URLSearchParams(queryBody).toString()
                : "")
            , {
                headers: headers,
            }
        );
    } else {
        if (!isFormData) {
            headers["Content-Type"] = "application/json";
        }

        response = fetch(`${SERVER_URL}/${endpoint}`, {
            method: "POST",
            headers: headers,
            body: isFormData === true ? reqBody : JSON.stringify(reqBody),
        });
    }

    return response.then((r) => r.ok ? r.json() : r.json().then((e) => Promise.reject(e)));
}