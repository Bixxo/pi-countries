import { Link } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
    return(
        <div className='Landing'>
            <h1>Welcome To My PI-Countries</h1>
            <Link to='/home'>
                <button>GO!</button>
            </Link>
        </div>
    )
}

export default Landing;