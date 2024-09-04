import { baseURL } from '../env.js';
import { logger } from '../utils/Logger.js';

// @ts-ignore
// eslint-disable-next-line no-undef
// NOTE use this api variable for the sandbox API only
export const api = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  withCredentials: true
})

// @ts-ignore
export const dndAPI = axios.create({
  // NOTE keep your baseURL generic, and you can be more specific when you are making the request in your service
  baseURL: 'https://www.dnd5eapi.co',
  // NOTE if we don't receive a response in 4 seconds, we will throw an error
  timeout: 4000
})

api.interceptors.request.use(config => config, handleAxiosError)
api.interceptors.response.use(response => response, handleAxiosError)

function handleAxiosError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logger.warn('[📡 AXIOS_ERROR_RESPONSE_DATA]', error.response.data)
  } else if (error.request) {
    // The request was made but no response was received
    logger.warn('[📡 AXIOS_ERROR_NO_RESPONSE]', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    logger.warn('[📡 AXIOS_ERROR_INVALID_REQUEST]', error.message)
  }
  return Promise.reject(error)
}