import http from "../http";

export default (): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.get('/sanctum/csrf-cookie')
            .then(() => http.post(`/auth/login`))
            .then(({ data }) => resolve(data || []))
            .catch(reject);
    });
};
