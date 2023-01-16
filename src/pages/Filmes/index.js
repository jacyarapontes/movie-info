import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import {toast} from 'react-toastify'

function Filmes(){
    const {id} =  useParams();  
    const navigate = useNavigate()
    const [filmes, setFilmes] =  useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        async function loadFilmes(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"bdbdc90659b9362a98bafa923719eb65",
                    language:"pt-BR",
                }
            })

            .then((response)=>{
                setFilmes(response.data);
                setLoading(false);
                console.log(response.data);
                setLoading(false);

            })
            .catch(()=>{
                console.log("Filme não encontrado");
                navigate("/", {replace: true});
                return;
            })

        }

        loadFilmes();

        return() =>{
            console.log("COMPONENTE FOI DESMONTADOR")
        }
    }, [navigate,id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeFlix");
        
        let filmesSlavo = JSON.parse(minhaLista)  || [];

        const hasFilme = filmesSlavo.some( (filmesSlavo) => filmesSlavo.id === filmes.id)

        if(hasFilme){
            toast.warn("Esse filme já está na sua lista! ")
            return;
        }

        filmesSlavo.push(filmes);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSlavo));
        toast.success("Filme salvo com sucesso!")
    }



    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>  
        )

    }

    return(
        <div className="filme-info">
            <h1>{filmes.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filmes.backdrop_path}`} alt={filmes.title}/>

            <h3>Sinopse</h3>
            <span>{filmes.overview}</span>
            <strong>Avaliação: {filmes.vote_averrage} / 10</strong>

        <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${filmes.title} Trailer`}>
                        Trailer
                    </a>
                </button>
        </div>


        </div>
    )
}

export default Filmes;