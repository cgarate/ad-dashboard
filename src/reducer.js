import { calculateCTR } from './utils'

export const UPDATE_DATA_ACTION = 'updateData'
export const RESET_CAMPAIGN_ID_ACTION = 'resetCampaignId'
export const UPDATE_CTR_ACTION = 'updateCTR'

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CTR_ACTION:
      return {
        ...state,
        totalCTR: calculateCTR(state.totalClicks, state.totalImpressions),
        ctr: calculateCTR(action.payload.clicks, action.payload.impressions)
      }
    case UPDATE_DATA_ACTION:
      return {
        clicks: action.payload.clicks,
        impressions: action.payload.impressions,
        users: action.payload.users,
        totalClicks: state.totalClicks + action.payload.clicks,
        totalUsers: state.totalUsers + action.payload.users,
        totalImpressions: state.totalImpressions + action.payload.impressions,
        iteration: state.iteration + 1,
      }
    case RESET_CAMPAIGN_ID_ACTION:
      return {
        clicks: 0,
        impressions: 0,
        users: 0,
        totalClicks: 0,
        totalImpressions: 0,
        totalUsers: 0,
        iteration: 0,
        totalCTR: 0,
        ctr: 0,
      }

    default:
      throw new Error('No action received')
  }
}

export default dashboardReducer
