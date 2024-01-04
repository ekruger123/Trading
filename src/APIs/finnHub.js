import axios from "axios";

const token = 'cm88sspr01qi5ocuq620cm88sspr01qi5ocuq62g';

export default axios.create ({
    baseURL: "https://finnhub.io/api/v1",
    params: {token: token}
})

