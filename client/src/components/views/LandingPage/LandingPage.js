import React,{ useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_URL} from '../../Config'
import {Typography, Row} from 'antd';
import GridCard from './section/GridCard'
const {Title} = Typography;
function LandingPage() {
    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-us&page=1`
        fetchMovies(endpoint)
        
    }, [])
    
    const fetchMovies = (path) => {
        fetch(path)
        .then(response=> response.json())
        .then(response=>{
            console.log(response)
            setMovies([...Movies, ...response.results])
            setCurrentPage(response.page)
        })
    }
    const handleClick = () => {
        let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-us&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);

    }

    return (
        <div style={{width:'100%', margin:0}}>
            <div style={{width: '85%', margin:'1rem auto'}}>
                <Title level={2}>Movies by release date</Title>
                <hr />
                <Row gutter ={[16, 16]}>
                    {Movies && Movies.map ((movie, index)=>(
                        <React.Fragment key ={index}>
                            <GridCard
                             image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                             movieid={movie.id}
                            
                            />
                        </React.Fragment>
                    ))}
                </Row>
                <br/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <button onClick={handleClick}>load more</button>

                </div>
            
            </div>

        </div>
    )
}

export default LandingPage
