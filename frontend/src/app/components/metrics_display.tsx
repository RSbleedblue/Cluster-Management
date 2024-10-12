import { useEffect, useState } from "react";
import { getClusters } from "../services/api";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const MetricsDisplay = () => {
    const [clusterData, setClusterData] = useState([]);
    const [timeRange, setTimeRange] = useState("last7days");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [averageReadIOPS, setAverageReadIOPS] = useState(0);
    const [averageWriteIOPS, setAverageWriteIOPS] = useState(0);
    const [averageReadThroughput, setAverageReadThroughput] = useState(0);
    const [averageWriteThroughput, setAverageWriteThroughput] = useState(0);

    useEffect(() => {
        const fetchClusters = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getClusters(timeRange);
                setClusterData(data);

                const totalReadIOPS = data.reduce((acc: any, cluster: { readIOPS: any; }) => acc + cluster.readIOPS, 0);
                const totalWriteIOPS = data.reduce((acc: any, cluster: { writeIOPS: any; }) => acc + cluster.writeIOPS, 0);
                setAverageReadIOPS(totalReadIOPS / data.length || 0);
                setAverageWriteIOPS(totalWriteIOPS / data.length || 0);

                const totalReadThroughput = data.reduce((acc: any, cluster: { readThroughput: any; }) => acc + cluster.readThroughput, 0);
                const totalWriteThroughput = data.reduce((acc: any, cluster: { writeThroughput: any; }) => acc + cluster.writeThroughput, 0);
                setAverageReadThroughput(totalReadThroughput / data.length || 0);
                setAverageWriteThroughput(totalWriteThroughput / data.length || 0);
            } catch (error) {
                console.error("Error fetching cluster data:", error);
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchClusters();
    }, [timeRange]);

    // Function to sort data based on timestamp
    const sortDataByTimestamp = (data) => {
        return data.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    };

    // Prepare chart data for IOPS
    const chartData = sortDataByTimestamp(
        clusterData.reduce((acc, cluster) => {
            const date = new Date(cluster.timestamp).toDateString();
            const existing = acc.find(item => item.date === date);

            if (existing) {
                existing.readIOPS += cluster.readIOPS;
                existing.writeIOPS += cluster.writeIOPS;
            } else {
                acc.push({
                    date,
                    readIOPS: cluster.readIOPS,
                    writeIOPS: cluster.writeIOPS,
                });
            }

            return acc;
        }, []).map(item => ({
            timestamp: item.date,
            readIOPS: item.readIOPS,
            writeIOPS: item.writeIOPS,
        }))
    );

    // Prepare chart data for Throughput
    const throughputChartData = sortDataByTimestamp(
        clusterData.reduce((acc, cluster) => {
            const date = new Date(cluster.timestamp).toDateString();
            const existing = acc.find(item => item.date === date);

            if (existing) {
                existing.readThroughput += cluster.readThroughput;
                existing.writeThroughput += cluster.writeThroughput;
            } else {
                acc.push({
                    date,
                    readThroughput: cluster.readThroughput,
                    writeThroughput: cluster.writeThroughput,
                });
            }

            return acc;
        }, []).map(item => ({
            timestamp: item.date,
            readThroughput: item.readThroughput,
            writeThroughput: item.writeThroughput,
        }))
    );

    const formatDate = (tick: string | number | Date) => {
        const date = new Date(tick);
        return date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate();
    };

    const formatYAxis = (value: number) => {
        return `${(value / 1000).toFixed(1)}k`; 
    };

    return (
        <div className="flex flex-col w-full">
            <div className="w-full flex justify-between items-center">
                <p className="text-white text-[30px]">Performance Metrics</p>
                <div className="relative">
                    <select
                        className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        <option value="last7days">Last 7 Days</option>
                    </select>
                </div>
            </div>

            {/* IOPS Chart */}
            <div className="flex w-full p-10 rounded-lg">
                <div className="flex flex-col w-[80%]">
                    <p className="text-2xl font-extralight text-white mb-10">IOPS</p>
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="w-full h-64">
                            <ResponsiveContainer>
                                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                                    <XAxis
                                        dataKey="timestamp"
                                        stroke="#ffffff"
                                        tickFormatter={formatDate}
                                        textAnchor="end"
                                        interval={0}
                                        dy={10}
                                    />
                                    <YAxis stroke="#ffffff" tickFormatter={formatYAxis} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="readIOPS" stroke="#955FD5" />
                                    <Line type="monotone" dataKey="writeIOPS" stroke="#00A3CA" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                <div className="flex flex-col mt-12 h-full justify-between w-[15%] gap-2">
                    <p className="text-gray-400 text-2xl">IOPS</p>
                    <div className="flex flex-col w-full border border-solid border-gray-700">
                        <div className="p-3">
                            <p className="text-xl text-gray-400">Read</p>
                            <p className="text-xl text-textPurple">{averageReadIOPS.toFixed(1)}k IOPS</p>
                        </div>
                        <div className="border border-solid w-full border-gray-700"></div>
                        <div className="p-3">
                            <p className="text-xl text-gray-400">Write</p>
                            <p className="text-xl text-textBlue">{averageWriteIOPS.toFixed(1)}k IOPS</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Throughput Chart */}
            <div className="flex w-full p-10 rounded-lg">
                <div className="flex flex-col w-[80%]">
                    <p className="text-2xl font-extralight text-white mb-10">Throughput</p>
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="w-full h-64">
                            <ResponsiveContainer>
                                <LineChart data={throughputChartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                                    <XAxis
                                        dataKey="timestamp"
                                        stroke="#ffffff"
                                        tickFormatter={formatDate}
                                        textAnchor="end"
                                        interval={0}
                                        dy={10}
                                    />
                                    <YAxis stroke="#ffffff" tickFormatter={formatYAxis} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="readThroughput" stroke="#955FD5" />
                                    <Line type="monotone" dataKey="writeThroughput" stroke="#00A3CA" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                <div className="flex flex-col mt-12 h-full justify-between w-[15%] gap-2">
                    <p className="text-gray-400 text-2xl">Throughput</p>
                    <div className="flex flex-col w-full border border-solid border-gray-700">
                        <div className="p-3">
                            <p className="text-xl text-gray-400">Read</p>
                            <p className="text-xl text-textPurple">{averageReadThroughput.toFixed(1)}k Bps</p>
                        </div>
                        <div className="border border-solid w-full border-gray-700"></div>
                        <div className="p-3">
                            <p className="text-xl text-gray-400">Write</p>
                            <p className="text-xl text-textBlue">{averageWriteThroughput.toFixed(1)}k Bps</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetricsDisplay;
