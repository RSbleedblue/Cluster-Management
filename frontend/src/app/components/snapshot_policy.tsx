import { useState } from "react";
import { updateSnapshotPolicy } from "../services/api";
import { toast } from "react-toastify";

const SnapshotPolicy = () => {
    const [policy, setPolicy] = useState("");
    const [applyToDirectory, setApplyToDirectory] = useState("");
    const [scheduleType, setScheduleType] = useState("");
    const [snapshotTime, setSnapshotTime] = useState("07:00"); 
    const [selectedDays, setSelectedDays] = useState({
        everyday: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
    });
    const [deletionPolicy, setDeletionPolicy] = useState("never"); 
    const [daysAfter, setDaysAfter] = useState(1);
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const policyData = {
            policy,
            applyToDirectory,
            scheduleType,
            snapshotTime,
            selectedDays,
            deletionPolicy,
            daysAfter,
        };
        try{
            await updateSnapshotPolicy(policyData);
            console.log(policyData);
            
            toast.success("Snapshot policy saved");
            setError("");
            setSuccess("Snapshot policy saved");
            resetForm();
        }
        catch{
            
            toast.error("Snapshot policy Failed to save")
            setError("Failed to save snapshot policy")
            setSuccess("")
        }

        console.log("Submitted Policy Data:", JSON.stringify(policyData, null, 2));
        resetForm();
    };

    const resetForm = () => {
        setPolicy("");
        setApplyToDirectory("");
        setScheduleType("");
        setSnapshotTime("07:00");
        setSelectedDays({
            everyday: false,
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false,
        });
        setDeletionPolicy("never");
        setDaysAfter(1);
    };

    const handleCancel = () => {
        resetForm(); // Reset form on cancel
    };

    const handleDayChange = (e) => {
        const { name, checked } = e.target;
        setSelectedDays((prevDays) => ({
            ...prevDays,
            [name]: checked,
        }));
    };

    return (
        <>
            <div className="flex flex-col gap-4 rounded-lg">
                <p className="text-[30px] text-white">Edit Snapshot Policy</p>
                <form onSubmit={handleSubmit} className="w-[60%]">
                    <div>
                        <label className="block text-gray-400 text-lg" htmlFor="policyName">Policy Name</label>
                        <input
                            type="text"
                            id="policyName"
                            onChange={(e) => setPolicy(e.target.value)}
                            value={policy}
                            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded text-white focus:outline-none mb-2"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-400 text-lg" htmlFor="applyToDirectory">Apply to Directory</label>
                        <div className="flex items-center rounded-lg bg-gray-700">
                            <span className="p-3 rounded-l-lg text-white bg-gray-800 w-12 flex items-center justify-center">/</span>
                            <input
                                type="text"
                                id="applyToDirectory"
                                onChange={(e) => setApplyToDirectory(e.target.value)}
                                value={applyToDirectory}
                                className="mt-1 p-2 w-full bg-gray-700 border-none rounded text-white focus:outline-none bg-transparent focus:bg-gray-700"
                                required
                            />

                        </div>
                    </div>
                    <div className="w-full">
                        <label className="block text-gray-400 text-lg" htmlFor="runPolicy">Run Policy on Following Schedule</label>
                        <div className="bg-sidebar p-4 flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Select Schedule Type</p>
                                <select
                                    id="runPolicy"
                                    value={scheduleType}
                                    onChange={(e) => setScheduleType(e.target.value)}
                                    className="mt-1 p-2 w-[30%] bg-gray-700 border border-gray-600 rounded text-white focus:outline-none"
                                >
                                    <option value="weeklyAndDaily">Weekly and Daily</option>
                                    <option value="daily">Daily</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Set to Time Zone</p>
                                <p className="text-gray-300">America / Los Angeles</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Take a Snapshot at</p>
                                <input
                                    type="time"
                                    value={snapshotTime}
                                    onChange={(e) => setSnapshotTime(e.target.value)}
                                    className="p-2 w-[30%] bg-gray-700 border border-gray-600 rounded text-white focus:outline-none"
                                />
                            </div>
                            <div className="justify-between items-center flex">
                                <p className="text-gray-300">On the Following Day(s)</p>
                                <div className="flex gap-4 mt-2">
                                    <label className="flex items-center text-white">
                                        <input
                                            type="checkbox"
                                            name="everyday"
                                            checked={selectedDays.everyday}
                                            onChange={handleDayChange}
                                            className="mr-2"
                                        />
                                        Every Day
                                    </label>
                                    {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                                        <label key={day} className="flex items-center text-gray-400">
                                            <input
                                                type="checkbox"
                                                name={day}
                                                checked={selectedDays[day]}
                                                onChange={handleDayChange}
                                                className="mr-2"
                                            />
                                            {day.charAt(0).toUpperCase() + day.slice(1)}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* Deletion Policy Section */}
                            <div className="flex justify-between items-center ">
                                <p className="text-gray-300">Delete each snapshot on</p>
                                <div className="flex gap-4 mt-2 justify-center">
                                    <label className="flex items-center text-white ">
                                        <input
                                            type="radio"
                                            name="deletionPolicy"
                                            value="never"
                                            checked={deletionPolicy === "never"}
                                            onChange={() => setDeletionPolicy("never")}
                                            className="mr-2"
                                        />
                                        Never
                                    </label>
                                    <label className="flex items-center text-gray-400">
                                        <input
                                            type="radio"
                                            name="deletionPolicy"
                                            value="afterDays"
                                            checked={deletionPolicy === "afterDays"}
                                            onChange={() => setDeletionPolicy("afterDays")}
                                            className="mr-2"
                                        />
                                        Automatically after
                                    </label>
                                    {deletionPolicy === "afterDays" && (
                                        <input
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={daysAfter}
                                            onChange={(e) => setDaysAfter(Number(e.target.value))}
                                            className="p-2 w-[50px] bg-gray-700 border border-gray-600 rounded text-white focus:outline-none"
                                        />
                                    )}
                                    <span className="text-gray-400">days</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col w-[180%]">
                        <label className="block text-gray-400 text-lg" htmlFor="snapshotLocking">Snapshot Locking</label>
                        <p className="text-sm text-gray-400 p-1">Locked snapshots cannot be deleted before the deletion schedule expires. For this feature to be available, snapshots must be set to automatically delete</p>
                        <div className="flex gap-2 text-lg">
                            <input type="checkbox" id="snapshotLocking" />
                            <label htmlFor="snapshotLocking" className="text-gray-400">Enable Locked snapshots</label>
                        </div>
                    </div>
                    <div className="flex gap-2 text-lg mt-10">
                        <input type="checkbox" id="enablePolicy" />
                        <label htmlFor="enablePolicy" className="text-gray-400">Enable Policy</label>
                    </div>

                    <div className="flex items-center gap-10">
                        <button
                            type="submit"
                            className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                        >
                            Save Policy
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="mt-4 text-blue-600"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
};

export default SnapshotPolicy;
