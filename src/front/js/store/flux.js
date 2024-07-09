const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            userName: null,
            loggedIn: false,
            token: null,
        },
        actions: {
            getInfo: async () => {
                const store = getStore();
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/private", {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${store.token}`,
                            "Content-Type": "application/json"
                        }
                    });
                    if (!response.ok) {
                        if (response.status === 401) {
                            console.error("Unauthorized access");
                        } else if (response.status === 422) {
                            console.error("Error 422: Unprocessable Content");
                        }
                        throw new Error("Could not fetch data");
                    }
                    const data = await response.json();
                    setStore({ userName: data.user_name }); // Assuming the response has user_name field
                } catch (error) {
                    console.log("Error fetching user info", error);
                }
            },
            postLogin: async (username, password) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_name: username,
                        password: password
                    })
                };
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", options);
                    if (resp.status !== 200) {
                        alert("There has been some error");
                        return false;
                    }
                    const data = await resp.json();
                    setStore({ token: data.access_token, loggedIn: true });
                    return true;
                } catch (error) {
                    console.error("There has been an error logging in", error);
                }
            },
            tokenLogout: () => {
                setStore({ loggedIn: false, token: null, userName: null });
            }
        }
    };
};

export default getState;
