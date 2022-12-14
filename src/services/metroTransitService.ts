import { BASE_URL } from '@/services/constants';
import { NexTripApi } from '@/services/generated-nextrip-api/index'
import axios from 'axios';

const axiosInstance = axios.create();
const nexTripApi = new NexTripApi(undefined, BASE_URL, axiosInstance);

export const metroTransitService = {
    findAllRoutes: async () => {
        const response = await nexTripApi.nextripv2RoutesGet();
        return response.data;
    },

    findDirectionsByRoute: async (routeId: String) => {
        const response = await nexTripApi.nextripv2DirectionsRouteIdGet(routeId);
        return response.data;
    },

    findStopsByRouteAndDirection: async (routeId: String, directionId: String) => {
        const response = await nexTripApi.nextripv2StopsRouteIdDirectionIdGet(routeId, directionId);
        return response.data;
    },

    findDepartureRouteAndDirectionAndPlace: async (routeId: String, directionId: String, placeCode: String) => {
        const response = await nexTripApi.nextripv2RouteIdDirectionIdPlaceCodeGet(routeId, directionId, placeCode);
        return response.data;
    },

}