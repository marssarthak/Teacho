import { useState } from "react";
import { ethers } from "ethers";
import web3modal from "web3modal";
import { address, abi } from "../config.js";
import styles from "../styles/style";
import { Navbar } from "../components";
import { Input } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { Heading } from "@chakra-ui/react";

export default function Publish() {
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    startTime: "",
    flowrate: null,
  });

  async function publish() {
    const meetingId = await createMeeting();

    if ((!formInput.title, !formInput.description, !formInput.time, !meetingId))
      return;

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
    <div className="bg-primary w-full overflow-hidden min-h-screen">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart} mt-5 text-center`}>
        <div className={`${styles.boxWidth}`}>
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Host your <span className="text-gradient">First Lecture</span>{" "}
          </h1>
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <section
            className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
          >
            <div className="flex-1 flex flex-col">
              <h2 className={styles.heading2}>Fill the given details.</h2>
              <div>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input type="text" />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input type="text" />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input type="text" />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input type="text" />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input type="text" />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
              </div>
            </div>

            <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
              {/* <Button /> */}
            </div>
          </section>
        </div>
      </div>
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
    </div>
  );
}
