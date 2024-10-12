import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3333/api'
});

export const getClusters = async (timeRange: string) => {
    const response = await apiClient.get('/clusters');
    return response.data;
};

export const getSnapshotPolicy = async () => {
    const response = await apiClient.get('/snapshot-policy');

    return response.data;
};

export const updateSnapshotPolicy = async (policy: any) => {
    const response = await apiClient.put('/snapshot-policy', policy, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response.data);
    
    return response.data;
};

export const createCluster = async (cluster: any) => {
    const response = await apiClient.post('/clusters', cluster);
    return response.data;
};
