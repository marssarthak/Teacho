import { useEffect, useState } from "react"
import { ethers } from "ethers";
import web3modal from "web3modal";
import { address, abi } from "../config.js";

export default function Gigs() {

    const [gigs, setGigs] = useState([])

    useEffect(() => {
        fetchAllGigs()
    }, [])

    async function getEthersProvider() {
        const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY
        const provider = new ethers.providers.JsonRpcProvider(
            `https://polygon-mumbai.infura.io/v3/${infuraKey}`
        );
        return provider
    }

    async function fetchAllGigs() {
        const ethersProvider = getEthersProvider()
        const contract = new ethers.Contract(address, abi, ethersProvider);
        const data = await contract.activeEvents();
        const itemsFetched = await Promise.all(
            data.map(async (i) => {
                let item = {
                    host: i.host,
                    title: i.title,
                    description: i.description,
                    time: i.time,
                    meetingId: i.meetingId,
                    flowRate: i.flowRate,
                    stringFlowRate: i.stringFlowRate,
                };
                return item;
            })
        );
    
        console.log("gigs", itemsFetched);
        setGigs(itemsFetched)
    
        return itemsFetched;
    }

    async function buy() {}
    
    return(
        <div>
            Gigs
            test
        </div>
    )
}