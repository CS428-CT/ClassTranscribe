import axios from "axios";

const BASE_URL = "https://classtranscribe-dev.ncsa.illinois.edu/api/";

export const HTTP_STATUS_CODES = {
    OK: 400,
}

export const api = axios.create({
    baseURL: BASE_URL,
});