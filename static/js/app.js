const COLORS = {
    confirmed: '#ff0000',
    recovered: '#008000',
    deaths: '#373c43',
}

const CASE_STATUS = {
    confirmed: 'confirmed',
    recovered: 'recovered',
    deaths: 'deaths',
}

let body = document.querySelector('body')

let countries_list

let all_time_chart, days_chart, recover_rate_chart

window.onload = async () => {
    console.log('ready')
    await loadData('Global')
}

loadData = async(country) => {
    startLoading()

    await initAllTimesChart()

    await loadSummary(country)

    endLoading()
}

startLoading = () => {
    body.classList.add('loading')
}

endLoading = () => {
    body.classList.remove('loading')
}


isGlobal = (country) => {
    return country === "Global"
}


numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

showConfirmedTotal = (total) => {
    document.querySelector('#confirmed-total').textContent = numberWithCommas(total)
}

showRecoveredTotal = (total) => {
    document.querySelector('#recovered-total').textContent = numberWithCommas(total)
}

showDeathsTotal = (total) => {
    document.querySelector('#death-total').textContent = numberWithCommas(total)
}

loadSummary = async (country) => {

    //country == slug
    let summaryData  = await covidApi.getSummary()

    let summary = summaryData.Global

    if(!isGlobal(country)) {
        summary = summaryData.Countries.filter(e => e.SLug === country)[0]
    }
    showConfirmedTotal(summary.TotalConfirmed)
    showRecoveredTotal(summary.TotalRecovered)
    showDeathsTotal(summary.TotalDeaths)
    
    //load countries table

    let casesByCountries = summaryData.Countries.sort((a,b) => b.TotalConfirmed - a.TotoalConfirmed)

    let table_countries_body = document.querySelector('#table-countries tbody')
    table_countries_body.innerHTML = ''

    for (let i = 0; i<100; i++) {
        let row = `
        <tr>
            <td>${casesByCountries[i].Country}</td>
            <td>${numberWithCommas(casesByCountries[i].TotalConfirmed)}</td>
            <td>${numberWithCommas(casesByCountries[i].TotalRecovered)}</td>
            <td>${numberWithCommas(casesByCountries[i].TotalDeaths)}</td>
        </tr>
        `
        table_countries_body.innerHTML += row
    }
}

initAllTimesChart = async () => {
    let options = {
        chart: {
            type: 'line'
        },
        colors: [COLORS.confirmed, COLORS.recovered, COLORS.deaths],
        series: [],
        xaxis: {
            categories: [],
            labels: {
                show: false
            }
        },
        grid: {
            show: false
        },
        stroke: {
            curve: 'smooth'
        }
    }

    all_time_chart = new ApexCharts(document.querySelector('#all-time-chart'),options)

    all_time_chart.render()
}
