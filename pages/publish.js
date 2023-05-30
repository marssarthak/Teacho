import { useState } from "react";

export default function Publish() {
    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        time: null,
        flowrate: null,
    });

    async function publish() {
        const dummyMeetingID = "";
        // contract code
    }

    async function createMeeting() {}

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
                name="flowrate"
                placeholder="Flow rate"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        flowrate: e.target.value,
                    })
                }
            />
            <input
                name="flowrate"
                placeholder="Flow rate"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        flowrate: e.target.value,
                    })
                }
            />
            <input type="submit" value="Publish" onClick={publish} />
        </div>
    );
}
