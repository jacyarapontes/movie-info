import axios from "axios";

//BASE DA API :https://api.themoviedb.org/3

//URL DA API:https://api.themoviedb.org/3/movie/now_playing?api_key=bdbdc90659b9362a98bafa923719eb65&language=pt-BR


const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'
});

export default api;