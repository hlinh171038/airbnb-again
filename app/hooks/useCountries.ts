import countries from 'world-countries'


// conutries contain all information conutries in the world
const formattedCountries = countries.map((country)=>({
    //alphabet 2
    value:country.cca2,
    //common name in E
    label: country.name.common,
    flag:country.flag,
    //coordination
    latlng:country.latlng,
    region:country.region
}));

const useCountries =() =>{
    //get all information
    const getAll = () =>formattedCountries;
    // get by value
    const getByValue = (value:string)=>{
        return formattedCountries.find(item => item.value === value)
    }
    return {
        getAll,
        getByValue
    }
}

export default useCountries;

