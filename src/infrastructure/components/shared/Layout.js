import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Header from './/Header';
// import Footer from '../components/Footer';
// import MiniLoader from './MiniLoader'
// import Modal from './Modal';
// import { get } from '../services/httpService'
import * as userActions from '../../actions/userActions';


function Layout(props) {
    // let [cities, setCities] = useState([])
    // let [shops, setShops] = useState([])
    // let user = verificarUsuarioLogueado()
    // const [isLoading, setIsLoading] = useState(false)
    // const [city, setCity] = useState(undefined)
    // const [shop, setShop] = useState(undefined)
    // const [formCity, setFormCity] = useState({id_city: 1, city_name: 'Manizales'})
    // const [formShop, setFormShop] = useState({})


    // useEffect(()=> {
    //     const loadCities = async () => {
    //         try {
    //             let data = await get('/api/v1/cities')
    //             setCities(data.data)
    //             if (data.data.length) {
    //                 setFormCity({id_city: data.data[0].id_city, city_name: data.data[0].city_name})
    //                 getShops(data.data[0].id_city)
    //                 setIsLoading(false)
    //             }
    //         } catch (err) {
    //             setCities([])
    //         }
    //     }
    //     loadCities()
    //     /* Aquí se debe hacer la carga del establecimiento */
    //     verifySelectedCity()

    // }, [])

    // function handleChange(e) {
    //     setFormShop({id_shop: e.target.value, shop_name: e.target.options[e.target.selectedIndex].text})
    // }

    // function handleChangeCity(e) {
    //     getShops(e.target.value);
    //     setFormCity({id_city: e.target.value, city_name: e.target.options[e.target.selectedIndex].text})
    // }

    // function handleOnClick(e){
    //     if(formCity){
    //         localStorage.setItem('city', JSON.stringify(formCity))
    //         setCity(formCity)
    //     }
    //     if (formShop) {
    //         localStorage.setItem('shop', JSON.stringify(formShop));
    //         setShop(formShop)
    //     }
    // }

    // async function getShops(city_id) {
    //     try {
    //         let data = await get(`/api/v1/index-city-shops?city_id=${city_id}`)
    //         if (data.data.length) {
    //             setFormShop({id_shop: data.data[0].id_shop, shop_name: data.data[0].shop_name})
    //         }
    //         setShops(data.data)
    //     } catch (err) {
    //         setShops([])
    //     }
    // }

    // const getCities = () => {
    //     let options_city = []
    //     if(cities != null || cities != undefined){
    //         for (const city of cities) {
    //             options_city.push(<option key={city.id_city} value={city.id_city}>{city.city_name}</option>)
    //         }
    //         return options_city
    //     }
    // }

    // const listShops = () => {
    //     let options = []
    //     for (const shop of shops) {
    //         options.push(<option key={shop.id_shop} value={shop.id_shop}>{shop.shop_name}</option>)
    //     }
    //     return options
    // }

    const childrenWithProps = React.Children.map(props.children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            //   return React.cloneElement(child, { city: city, shop: shop});
            return React.cloneElement(child);
        }
        return child;
    });
    const {users}  = props;
    return (
        <React.Fragment>
            {/* <Header userData={user.user} userIsLoggedIn={user.isLoggedIn}/> */}
            <Header/>
            <main className=' d-flex justify-content-center align-items-center' style={{ 'height':'100%', 'minHeight': '80%' }}>
                {childrenWithProps}
            </main>
            {/* <Footer/> */}
            {/* <Modal className="cities" isOpen={!city} hasClose = "false">
                <div className="container container-title">
                <div className="title-1">
                    <h2 className="text-center">Elige la ciudad del</h2>
                </div>
                <div className="title-2">
                <h1 className="text-center">domicilio</h1>
                </div>
                </div>
                <div className="form-group">
                    <select className="form-control input-register select-form" id="select-ciudad" name="select-ciudad" onChange={handleChangeCity}>
                        {getCities()}
                    </select>
                    {   
                        isLoading?
                        <MiniLoader/> :
                        ""
                    }
                </div>
                <div className="form-group">
                    <select className="form-control input-register select-form" id="select-shop" name="select-shop" onChange={handleChange}>
                       {listShops()}
                    </select>
                </div> 
                <div className="col text-center">
                <button type="submit" className="btn button-send-information button-city btn-block mt-2 align-center" onClick={handleOnClick}>Seleccionar ciudad</button>
                </div>
            </Modal> */}
        </React.Fragment>
    )

    // function verificarUsuarioLogueado() {
    //     let localStorageState = localStorage["appState"];
    //     if (localStorageState) {
    //         let AppState = JSON.parse(localStorageState);
    //         return { isLoggedIn: AppState.isLoggedIn, user: AppState.user }
    //     }
    //     return { isLoggedIn: false, user: {} }
    // }

    // function verifySelectedCity() {
    //     let appLocalStorage = localStorage.city;
    //     if (appLocalStorage) {
    //         let AppState = JSON.parse(appLocalStorage);
    //         let appLocalStorageShop = localStorage.shop;
    //         setCity(AppState)
    //         if (appLocalStorageShop) {
    //             let AppStateShop = JSON.parse(appLocalStorageShop);
    //             setShop(AppStateShop)
    //         }
    //     }
    //     return undefined
    // }
}
const mapStateToProps = ({ userReducer }) => userReducer;

export default connect(mapStateToProps, userActions)(Layout);