// import apiClient from './apiClient';

// // Example: Adjust types and endpoints as needed
// export const getTables = async () => {
//   try {
//     const response = await apiClient.get('/buses');
//     // Return only the array, not the whole response object
//     return response.data.message;
//   } catch (error) {
//     throw error;
//   }
// };

// export const createBus = async (busData: any) => {
//   try {
//     const response = await apiClient.post('/bus', busData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateBus = async (id: string, busData: any) => {
//   try {
//     const response = await apiClient.patch(`/bus/update/${id}`, busData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteBus = async (id: string) => {
//   try {
//     const response = await apiClient.delete(`/buses/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const setBusActiveStatus = async (id: string, status: boolean) => {
//   try {
//     const response = await apiClient.patch(`/bus/${id}/active`, { status });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }; 