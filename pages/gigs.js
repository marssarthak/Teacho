import { useEffect } from "react"

export default function Gigs() {

    useEffect(() => {
        fetchAllGigs()
    }, [])

    async function fetchAllGigs() {}

    async function buy() {}
    
    return(
        <div>
            Gigs
            test
        </div>
    )
}