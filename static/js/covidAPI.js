const covidApi = {
    getSummary: async () => {
        return await fetchRequest(covidApiEndPoint.summary())
    },
    getWorldAllTimeCases: async () => {
        return await fetchRequest(covidApiEndPoint.worldAllTimeCases())
    },
    getCountryAllTimeCases: async (country, status) => {
        return await fetchRequest(covidApiEndPoint.countryAllTimeCases(country, status))
    }
}

const covid_api_base = 'https://api.covid19api.com/'

const covidApiEndPoint = {
    summary: () => {
        return getApiPath('summary')
    },
    worldAllTimeCases: () => {
        return getApiPath('world')
    },
    countryAllTimeCases: (country,status) => {
        let end_point = `dayone/country/${country}/status/${status}`
        return getApiPath(end_point)
    }
}

getApiPath = (end_point) => {
    return covid_api_base + end_point
}