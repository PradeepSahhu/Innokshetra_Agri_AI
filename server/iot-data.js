// mock a endpoint which will send mock data in response
// for testing purpose only

export const mockData = () => {
    // random data for each call 
    // for testing purpose only
    const nitrogen = Math.floor(Math.random() * 300) + 1
    const phosphorous = Math.floor(Math.random() * 200) + 1
    const potassium = Math.floor(Math.random() * 200) + 1
    const temperature = Math.floor(Math.random() * 50) + 1
    const humidity = Math.floor(Math.random() * 100) + 1
    const ph = (Math.floor(Math.random() * 100)) % 14 + 1
    const rainfall = Math.floor(Math.random() * 800) + 1

    return {
        nitrogen,
        phosphorous,
        potassium,
        temperature,
        humidity,
        ph,
        rainfall
    }
}

console.log(mockData())