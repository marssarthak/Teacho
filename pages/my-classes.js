import { useState, useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import web3modal from "web3modal";
import { address, abi } from "../config.js";

export default function MyClasses() {
    const receiverAddress = `0x248F5db296Ae4D318816e72c25c93e620341f621`;
    const flowRate = `385802469135802`;

    const [superTokenAddress, setSuperTokenAddress] = useState(
        `0x96B82B65ACF7072eFEb00502F45757F254c2a0D4`
    );
    const [superToken, setSuperToken] = useState();
    const [gigs, setGigs] = useState([]);

    async function getEthersProvider() {
        const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
        const provider = new ethers.providers.JsonRpcProvider(
            `https://polygon-mumbai.infura.io/v3/${infuraKey}`
        );
        return provider;
    }

    useEffect(() => {
        initialize();
        // fetchMyClasses();
    }, []);

    async function initialize() {
        const provider = await getEthersProvider()
        const xsf = await Framework.create({
            chainId: 80001,
            provider,
        });
        // setSf(xsf);

        const sT = await xsf.loadSuperToken(superTokenAddress);
        setSuperToken(sT);

        console.log("ready");
    }

    async function fetchMyClasses() {
        const ethersProvider = await getEthersProvider();
        const contract = new ethers.Contract(address, abi, ethersProvider);
        const data = await contract.myClasses();
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
                    gigId: i.gigId,
                };
                return item;
            })
        );

        console.log("gigs", itemsFetched);
        setGigs(itemsFetched);

        return itemsFetched;
    }

    async function joinMeeting() {
        await startFlow(receiverAddress, flowRate);
        await getFlowInfo(receiverAddress);
        // join meeting 
    }

    async function endMeeting() {
        await stopFlow(receiverAddress);
        // end meeting
    }

    async function startFlow(xReceiverAddress, xFlowRate) {
        const modal = new web3modal({
            network: "mumbai",
            cacheProvider: true,
        });
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        let accounts = await provider.send("eth_requestAccounts", []);
        let senderAddress = accounts[0];
        const signer = provider.getSigner();

        const createFlowOperation = superToken.createFlow({
            sender: senderAddress,
            receiver: xReceiverAddress,
            flowRate: xFlowRate,
        });

        const txnResponse = await createFlowOperation.exec(signer);
        const txnReceipt = await txnResponse.wait();
        console.log("started");
    }

    async function stopFlow(xReceiverAddress) {
        const modal = new web3modal({
            network: "mumbai",
            cacheProvider: true,
        });
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        let accounts = await provider.send("eth_requestAccounts", []);
        let senderAddress = accounts[0];
        const signer = provider.getSigner();

        const flowOp = superToken.deleteFlow({
            sender: senderAddress,
            receiver: xReceiverAddress,
        });

        const txnResponse = await flowOp.exec(signer);
        const txnReceipt = await txnResponse.wait();
        console.log("stopped");
    }

    async function getFlowInfo(xReceiverAddress) {
        const provider = await getEthersProvider()
        const flowInfo = await superToken.getFlow({
            sender: senderAddress,
            receiver: xReceiverAddress,
            providerOrSigner: provider,
        });
        console.log("flowInfo", flowInfo);
    }

    function Card(prop) {
        return (
            <div>
                <p>{prop.title}</p>
                <p>{prop.description}</p>
                <p>{prop.time}</p>
                <p>{prop.stringFlowRate} Matic/Hour</p>
                <button onClick={() => joinMeeting(prop)}>Join Meeting</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            My classes
            <button onClick={startFlow}>start flow</button>
            <button onClick={stopFlow}>stop flow</button>
            <button onClick={getFlowInfo}>Get info</button>
            <div>
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
