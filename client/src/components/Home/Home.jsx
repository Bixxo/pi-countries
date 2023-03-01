import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllCountries, filterName, orderByContinet, getAllActivities, sortActivity, orderBySort } from '../../redux/actions/index'
import { useEffect, useState } from 'react'
import CountriesCard from '../CountriesCard/CountriesCard'
import './Home.css'


const Home = props => {

    const { getAllCountries, filterName, filter, countries, orderByContinet, getAllActivities, activities, sortActivity, orderBySort } = props


    useEffect(() => {
        getAllCountries()
        getAllActivities()
    },[])


    const [currentPage, setCurrenPage] = useState(1)
    const elementsPages = 10
    const indexLastElement = currentPage * elementsPages;
    const indexFirstElement = indexLastElement - elementsPages;


    const [currentPageFilter, setCurrenPageFilter] = useState(1)
    const indexLastElementFilter = currentPageFilter * elementsPages;
    const indexFirstElementFilter = indexLastElementFilter - elementsPages;

    const getCurrentPageElements = elements => {
        if(Array.isArray(elements)) {
            return elements.slice(indexFirstElement, indexLastElement)
        }
    }
    const getCurrentPageElementsFilter = elements => {
        if(Array.isArray(elements)) {
            return elements.slice(indexFirstElementFilter, indexLastElementFilter)
        }
    }

    const handlePageChange = e => {
        setCurrenPage(e.target.value)
        console.log(e.target.value);
    }
    const handlePageChangeFilter = newPageNumbre => {
        setCurrenPageFilter(newPageNumbre)
        console.log(newPageNumbre);
    }
    //paises completos
    const pageElements = getCurrentPageElements(countries)
    const totalPages = Math.ceil(countries.length / elementsPages)
    const pagesButtons = Array.from({length: totalPages},(_, i) => i + 1)
    
    //paises con filtro
    const pageElementsFilter = getCurrentPageElementsFilter(filter)
    const totalPagesFilter = Math.ceil(filter.length / elementsPages)
    const pagesButtonsFilter = Array.from({length: totalPagesFilter},(_, i) => i + 1)

    const [input, setInput] = useState({
        name: ''
    })

    const clear = () => {
        setInput({
            name: ''
        })
    }

    const handleOnChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleName = async e => {
        e.preventDefault();
        await filterName(input.name).then(res => {
            if(res.payload?.msg) {
                alert(res.payload.msg)
            }
        }).then(() => clear())
        setCurrenPage(1)
        setCurrenPageFilter(1)
    }

    const handleSortContinent = async e => {
        e.preventDefault()
        await getAllCountries()
        await orderByContinet(e.target.value)
        setCurrenPage(1)
        setCurrenPageFilter(1)
        if (e.target.value === 'All') {
            e.target.value = 'default'
            let activity = document.getElementById('activity')
            activity.value = 'default'
        }
    }

    const handleActivity = async e => {
        e.preventDefault()
        await getAllCountries()
        if (e.target.value === 'Sin Actividades') {
            alert('No hay cargadas actividades no andes de curioso >:v')
            e.target.value = 'default'
        }
        await sortActivity(e.target.value)
        setCurrenPage(1)
        setCurrenPageFilter(1)
    }

    const handleSort = async e => {
        e.preventDefault()
        await getAllCountries()
        await orderBySort(e.target.value)
        setCurrenPage(2)
        setCurrenPageFilter(2)
        setCurrenPage(1)
        setCurrenPageFilter(1)
        if (e.target.value === 'sf') {
            e.target.value = 'default'
        }
    }

    return(
        <div className="mainHome">
            <h1>WELCOME</h1>
            <div className="form">
                <form onSubmit={handleName}>
                    <input value={input.name} name="name" placeholder="Search Country..." type="text" onChange={handleOnChange}/>
                    <select name="continente" defaultValue="default" onChange={handleSortContinent}>
                        <option disabled value="default">--Continentes--</option>
                        <option name="africa" value="Africa">Africa</option>
                        <option name="americas" value="Americas">Americas</option>
                        <option name="antartic" value="Antarctic">Antarctic</option>
                        <option name="asia" value="Asia">Asia</option>
                        <option name="europe" value="Europe">Europe</option>
                        <option name="oceania" value="Oceania">Oceania</option>
                        <option name="all" value="All">All</option>
                    </select>
                    <select id='activity' name="actividad" defaultValue="default" onChange={handleActivity}>
                        <option disabled value="default" >--Actividad--</option>
                        {Array.isArray(activities) ? activities.map(el => <option key={el.id} value={el.name}>{el.name}</option>) : <option disabled>Sin Actividades</option>}
                    </select>
                    <select name="sort" defaultValue="default" onChange={handleSort}>
                        <option disabled value="default">--Ordenar Por--</option>
                        <option value="az">Alfabeticamnete (A - Z)</option>
                        <option value="za">Alfabeticamente (Z - A)</option>
                        <option value="poM">Poblacion (Mayor)</option>
                        <option value="pom">Poblacion (Menor)</option>
                        <option value="arM">Area (Mayor)</option>
                        <option value="arm">Area (Menor)</option>
                        <option value="sf">Sin Filtro</option>
                    </select>
                </form>
                <Link to="/form"> <button>Crear Actividad</button> </Link>
            </div>
            <div className='cards'>
                {Array.isArray(filter) ? pageElementsFilter.map(el => <CountriesCard key={el.idd} data={el} />) : pageElements.map(el => <CountriesCard key={el.idd} data={el} />)}
            </div>
            <div className='paginado'>
                {Array.isArray(filter) ? pagesButtonsFilter.map(el => <button key={el} onClick={() => handlePageChangeFilter(el)} disabled={currentPageFilter === el}>{el}</button>) : pagesButtons.map(el => <button key={el} onClick={() => handlePageChange(el)} disabled={currentPage === el}>{el}</button>)}
            </div>
        </div>
    )
}

export const mapStateToProps = state => {
    return {
        countries: state.countries,
        filter: state.filter,
        activities: state.activity
    }
}

export default connect(mapStateToProps, { getAllCountries, filterName, orderByContinet, getAllActivities, sortActivity, orderBySort })(Home)