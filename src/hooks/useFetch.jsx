import { useEffect, useState } from 'react'

export const useFetch = async (url) => {
    const [data, setData] = useState(url)

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json))
    }, [])
    console.log(data)
    return { data }
}
