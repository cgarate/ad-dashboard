/* eslint-disable import/prefer-default-export */
import axios from 'axios'

import { ENDPOINT_CAMPAIGNS } from './constants'

export const fetchCampaigns = async () => {
  const response = await axios.get(ENDPOINT_CAMPAIGNS)
  return response.data
}

export const fetchCampaignById = async (id, num) => {
  const { data } = await axios.get(`${ENDPOINT_CAMPAIGNS}/${id}?number=${num}`)
  return data
}
