"use client";
import { CheckCircleIcon, UserIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import MetricsDisplay from "./metrics_display";
import SnapshotPolicy from "./snapshot_policy";

const DashBoard = () => {
    const [activeView, setActiveView] = useState("metrics");

    return (
        <>
            <div className="flex h-screen">
                <div className="flex flex-col p-10 items-center text-white gap-2 bg-sidebar justify-between">
                    <div className="flex flex-col gap-10">
                        <p className="text-[30px]">Cluster Name</p>
                        <div className="flex flex-col items-start gap-4">
                            <button
                                onClick={() => setActiveView("metrics")}
                                className={`flex items-center gap-2 ${activeView === "metrics" ? "text-blue-500" : "text-white"
                                    }`}
                            >
                                <CheckCircleIcon className="h-5 w-5" />
                                Performance Metrics
                            </button>
                            <button
                                onClick={() => setActiveView("snapshot")}
                                className={`flex items-center gap-2 ${activeView === "snapshot" ? "text-blue-500" : "text-white"
                                    }`}
                            >
                                <CheckCircleIcon className="h-5 w-5" />
                                Edit Snapshot Policy
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <UserIcon className="h-6 w-6" /> 
                        <h1>User</h1>
                    </div>
                </div>
                <div className=" p-10 w-[80%] ">
                    {
                        activeView === 'metrics' && (
                            <MetricsDisplay />
                        )
                    }
                    {
                        activeView === 'snapshot' && (
                            <SnapshotPolicy />
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default DashBoard;
