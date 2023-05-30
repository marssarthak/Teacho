import { useState, useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

export default function MyClasses() {
    const [senderAddress, setSenderAddress] = useState(
        `0x48e6a467852Fa29710AaaCDB275F85db4Fa420eB`
    );
    const [receiverAddress, setReceiverAddress] = useState(
        `0x248F5db296Ae4D318816e72c25c93e620341f621`
    );
    const [flowRate, setFlowRate] = useState(`385802469135802`);
    const [superTokenAddress, setSuperTokenAddress] = useState(
        `0x96B82B65ACF7072eFEb00502F45757F254c2a0D4`
    );
    const [sf, setSf] = useState();

    const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.infura.io/v3/eec39d04a1064883bf94ec917264ce9a"
    );

    useEffect(() => {
        initialize();
    }, []);

    async function initialize() {
        const xsf = await Framework.create({
            chainId: 80001,
            provider,
        });
        setSf(xsf);
    }

    async function fetchMyClasses() {
        // fetches purchased classes
    }

    async function joinMeeting() {
        await startFlow();
        // meeting code
    }

    async function endMeeting() {
        await stopFlow();
        // meeting code
    }

    async function startFlow() {
        const superToken = await sf.loadSuperToken(superTokenAddress);

        const signer = sf.createSigner({
            privateKey:
                "d653763be1854048e1a70dd9fc94d47c09c790fb1530a01ee65257b0b698c352",
            provider,
        });

        const createFlowOperation = superToken.createFlow({
            sender: senderAddress,
            receiver: receiverAddress,
            flowRate: flowRate,
        });

        const txnResponse = await createFlowOperation.exec(signer);
        const txnReceipt = await txnResponse.wait();
        console.log("started");
    }

    async function stopFlow() {
        const superToken = await sf.loadSuperToken(superTokenAddress);

        const signer = sf.createSigner({
            privateKey:
                "d653763be1854048e1a70dd9fc94d47c09c790fb1530a01ee65257b0b698c352",
            provider,
        });

        const flowOp = superToken.deleteFlow({
            sender: senderAddress,
            receiver: receiverAddress,
        });

        const txnResponse = await flowOp.exec(signer);
        const txnReceipt = await txnResponse.wait();
        console.log("stopped");
    }

    async function getFlowInfo() {
        const superToken = await sf.loadSuperToken(superTokenAddress);

        const flowInfo = await superToken.getFlow({
            sender: senderAddress,
            receiver: receiverAddress,
            providerOrSigner: provider,
        });
        console.log("flowInfo", flowInfo);
    }

    return (
        <div className="flex flex-col">
            My classes
            <button onClick={startFlow}>start flow</button>
            <button onClick={stopFlow}>stop flow</button>
            <button onClick={getFlowInfo}>Get info</button>
        </div>
    );
}
