import { useState } from "react";
import { ethers } from "ethers";
import web3modal from "web3modal";
import { address, abi } from "../config.js";

export default function Publish() {
    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        startTime: "",
        flowrate: null,
    });

    async function publish() {
        const meetingId = await createMeeting();

        if (!formInput.title, !formInput.description, !formInput.time, !meetingId) return

        const modal = new web3modal({
            network: "mumbai",
            cacheProvider: true,
        });
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        // const amountInWei = ethers.BigNumber.from(formInput.flowrate);
        // const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
        // const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
        const calculatedFlowRate = 385802469135802;
        const publish = await contract.createGig(
            formInput.title,
            formInput.description,
            formInput.startTime,
            meetingId,
            calculatedFlowRate,
            formInput.flowrate,
            {
                gasLimit: 1000000,
            }
        );
        await publish.wait();

        console.log("published");
    }

    async function createMeeting() {
        // create meeting
        return "test-id";
    }

    return (
        <div>
            Publish
            <input
                name="title"
                placeholder="Title"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        title: e.target.value,
                    })
                }
            />
            <input
                name="description"
                placeholder="Description"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        description: e.target.value,
                    })
                }
            />
            <input
                name="startTime"
                placeholder="Meeting Time"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        startTime: e.target.value,
                    })
                }
            />
            <input
                name="flowrate"
                placeholder="matic/hour"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        flowrate: e.target.value,
                    })
                }
            />
            <button onClick={publish}>Publish</button>
        </div>
    );
}
