import axios from 'axios'

const Explore = () => {
    let animals = []

    const loadBasicInfo = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/getAnimalsBasic')
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const initAnimals = () => {
        loadBasicInfo().then((data) => {
            console.log(data.animals)
        })
    }

    return (
        <>
            <p>explore</p>
        </>
    )
}

export default Explore