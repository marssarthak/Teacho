import { useEffect, useState } from "react";
import { ethers } from "ethers";
import web3modal from "web3modal";
import { address, abi } from "../config.js";

export default function Gigs() {
    const [gigs, setGigs] = useState([]);

    useEffect(() => {
        fetchAllGigs()
    }, []);

    async function getEthersProvider() {
        const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
        const provider = new ethers.providers.JsonRpcProvider(
            `https://polygon-mumbai.infura.io/v3/${infuraKey}`
        );
        return provider;
    }

    async function fetchAllGigs() {
        const provider = await getEthersProvider();
        const contract = new ethers.Contract(address, abi, provider);
        const data = await contract.listGigs();
        const itemsFetched = await Promise.all(
            data.map(async (i) => {
                let parseStringFlowRate = ethers.utils.formatEther(i.stringFlowRate);
                let item = {
                    host: i.host.toString(),
                    title: i.title,
                    description: i.description,
                    time: i.time,
                    meetingId: i.meetingId,
                    flowRate: i.flowRate.toNumber(),
                    stringFlowRate: parseStringFlowRate,
                    gigId: i.gigId.toNumber(),
                    nftTokenId: i.nftTokenId.toNumber(),
                    attendees: i.attendees.toNumber(),

                };
                return item;
            })
        );

        console.log("gigs", itemsFetched);
        setGigs(itemsFetched);

        return itemsFetched;
    }

    async function buy(prop) {
        const modal = new web3modal({
            network: "mumbai",
            cacheProvider: true,
        });
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        const advancePay = prop.stringFlowRate * 10/100;
        const price = ethers.utils.parseUnits(advancePay.toString(), "ether");
        const transaction = await contract.buy(prop.gigId, {
            value: price,
            gasLimit: 1000000,
        });
        await transaction.wait();
        console.log("purchased")
        fetchAllGigs();
    }

    function Card(prop) {
        return (
            <div>
                <p>{prop.title}</p>
                <p>{prop.description}</p>
                <p>{prop.time}</p>
                <p>{prop.stringFlowRate} Matic/Hour</p>
                <button onClick={() => buy(prop)}>Buy</button>
            </div>
        );
    }

    return (
        <div>
            Gigs
            <div className="text-black">
                {gigs.map((item, i) => (
                    <Card
                        key={i}
                        host={item.host}
                        title={item.title}
                        description={item.description}
                        time={item.time}
                        meetingId={item.meetingId}
                        flowRate={item.flowRate}
                        stringFlowRate={item.stringFlowRate}
                        gigId={item.gigId}
                    />
                ))}
            </div>
        </div>
    );
}
