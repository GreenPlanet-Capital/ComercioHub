import { SERVER_URL } from "./constants";

export async function makeRequest(
    endpoint: string,
    reqBody: any,
    queryBody: any,
    isFormData: boolean
) {
    let response;
    queryBody = queryBody || {};

    if (reqBody === null) {
        response = fetch(
            `${SERVER_URL}/${endpoint}` +
            (Object.keys(queryBody).length !== 0
                ? "?" + new URLSearchParams(queryBody).toString()
                : "")
        );
    } else {
        let headers: any = {};

        if (!isFormData) {
            headers["Content-Type"] = "application/json";
        }

        response = fetch(`${SERVER_URL}/${endpoint}`, {
            method: "POST",
            headers: headers,
            body: isFormData === true ? reqBody : JSON.stringify(reqBody),
        });
    }

    return response.then((r) => r.json());
}