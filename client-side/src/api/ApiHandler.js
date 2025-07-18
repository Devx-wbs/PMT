import axios from "axios";
import { Methods } from "./Api";
export const apiHandler = {
    PostApi: async (url, data) => {
        // console.log("jnkjnjknjknjk",url);
        let result = {};
        let config = {
            method: Methods.Post,
            maxBodyLength: Infinity,
            url: url,
            headers: {
                "Content-Type": "application/json",
                Cookie:
                    "sails.sid=s%3AZDEamcBwnC3QaSbXkt0il5OC2-8WYYHg.0wUQtkPzkRGFYGPQ1v8msm%2FF%2FfYQMDqAyEIei6eT8Ks",
            },
            data: data,
        };
        await axios
            .request(config)
            .then(async (response) => {
                result = await response.data;
            })
            .catch(async (error) => {
                result = await error.response.data;
            });
        return result;
    },

    GetApi: async (url, token) => {
        let result = {};
        let config = {
            method: Methods.Get,
            maxBodyLength: Infinity,
            url: url,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Cookie:
                    "sails.sid=s%3AZDEamcBwnC3QaSbXkt0il5OC2-8WYYHg.0wUQtkPzkRGFYGPQ1v8msm%2FF%2FfYQMDqAyEIei6eT8Ks",
            },
        };
        await axios
            .request(config)
            .then(async (response) => {
                result = await response.data;
            })
            .catch(async (error) => {
                result = await error.response.data;
            });
        return result;
    },

    PutApi: async (url, data, token) => {
        console.log(url, data, token);
        let result = {};
        let config = {
            method: Methods.Put,
            maxBodyLength: Infinity,
            url: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                Cookie:
                    "sails.sid=s%3AZDEamcBwnC3QaSbXkt0il5OC2-8WYYHg.0wUQtkPzkRGFYGPQ1v8msm%2FF%2FfYQMDqAyEIei6eT8Ks",
            },
            data: data,
        };
        await axios
            .request(config)
            .then(async (response) => {
                result = await response.data;
            })
            .catch(async (error) => {
                result = await error?.response?.data?.error;
            });
        return result;
    },

    DeleteApi: async (url, Token) => {
        let result = {};
        let config = {
            method: Methods.Delete,
            maxBodyLength: Infinity,
            url: url,
            headers: {
                Authorization: `Bearer ${Token}`,
                Cookie:
                    "sails.sid=s%3A-asMuvowoNw7_bN_jLVHL-y--V2FKbV9.10KTk7TrN3feF5dp8GIJp6EHRDp8LApm3zUF4TByKck",
            },
        };

        await axios
            .request(config)
            .then(async (response) => {
                result = response.data;
            })
            .catch(async (error) => {
                result = await error.response.data;
            });
        return result;
    },
    postApiWithToken: async (url, data, token) => {
        let config = {
            method: Methods.Post,
            maxBodyLength: Infinity,
            url: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Cookie:
                    "sails.sid=s%3Acf-TkUNaN1wfBokuL0va7_VytFi_-gOd.2qWUOS7ycwImvuYcM0HOd0bU%2F2CHVs4wzSXC%2F8fODyI",
            },
            data: data,
        };

        await axios
            .request(config)
            .then(async (response) => {
                result = await response.data;
            })
            .catch(async (error) => {
                result = await error.response.data;
            });
        return result;
    },
    imageUpload: async (url, data, accessToken) => {
        let result = [];
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Cookie:
                        "sails.sid=s%3AR_WSLV8zwAX9Ynaaeg9cDMKop9UbBu2F.k%2BsXbFB3fJSRzzsDx%2BWNXJ%2Bil3IzEZkvrE2AXisWUtg",
                },
                body: data,
            };
            const response = await fetch(url, requestOptions);
            result = await response.json();
            if (result.success) {
            }
        } catch (error) {
            result = await error;
        }
        return result;
    },
    uploadDoc: async (formdata) => {
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formdata,
            redirect: "follow",
        };

        fetch(
            "http://74.208.206.18:4020/upload/document/multiple?modelName=users",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    },
};