/* eslint-disable no-unused-vars */
import { Flex, Heading, SimpleGrid, Tag, TagLabel } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'

import {
  ENDPOINT_CAMPAIGNS,
  REFRESH_EVERY_X_MS,
  metricHeadings,
  metricHelpText,
} from '../../constants'
import useInterval from '../../hooks/useInterval'
import dashboardReducer, {
  RESET_CAMPAIGN_ID_ACTION,
  UPDATE_CTR_ACTION,
  UPDATE_DATA_ACTION,
} from '../../reducer'
import DataCard from './DataCard'

const Dashboard = ({ campaignName, campaignId }) => {
  const initialState = {
    totalClicks: 0,
    totalImpressions: 0,
    totalUsers: 0,
    iteration: 0,
    totalCTR: 0,
    clicks: 0,
    users: 0,
    impressions: 0,
    ctr: 0,
  }

  // The state updates are complex enough to switch to useReducer
  const [state, dispatch] = useReducer(
    dashboardReducer,
    initialState
  )

  const {
    iteration,
    users,
    clicks,
    impressions,
    totalClicks,
    totalUsers,
    totalImpressions,
    totalCTR,
    ctr,
  } = state

  const numberFormat = new Intl.NumberFormat()

  const loadAdData = () => {
    fetch(
      `${ENDPOINT_CAMPAIGNS}/${campaignId}?number=${iteration}`
    )
      .then((response) => response.json())
      .then((data) => {
        const payload = {
          clicks: data.clicks,
          impressions: data.impressions,
          users: data.users,
        }
        dispatch({
          type: UPDATE_DATA_ACTION,
          payload,
        })
        dispatch({
          type: UPDATE_CTR_ACTION,
          payload,
        })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('ERROR IN API CALL: ', error)
      })
  }

  // first load of data
  useEffect(() => {
    // Reset the state every time the campaignId changes
    dispatch({
      type: RESET_CAMPAIGN_ID_ACTION,
    })
    loadAdData()
  }, [campaignId])

  // Call useInterval to refresh the data every X ms
  useInterval(() => {
    loadAdData()
  }, REFRESH_EVERY_X_MS)

  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection={[
          'column-reverse',
          'column-reverse',
          'column-reverse',
          'row',
          'row',
        ]}
        justifyContent="flex-start"
        alignItems={[
          'flex-start',
          'flex-start',
          'flex-start',
          'center',
          'center',
        ]}
      >
        <Flex
          alignItems="center"
          padding={['0.5rem', '0.5rem', '1rem', '2rem', '2rem']}
        >
          <Heading
            marginLeft={['0.5rem', '0.5rem', '1rem', '0.5rem', '0.5rem']}
          >
            Performance Metrics Dashboard
          </Heading>
        </Flex>

        {campaignName && (
          <Tag
            size="lg"
            height="50px"
            colorScheme={campaignName.toLowerCase()}
            marginTop={['1rem', '1rem', '1rem', '0', '0']}
            marginLeft={['0.5rem', '0.5rem', '2rem', '0', '0']}
          >
            <TagLabel>{campaignName}</TagLabel>
          </Tag>
        )}
      </Flex>
      <SimpleGrid
        minChildWidth={['100px', '120px', '250px', '250px']}
        padding={['1rem', '1rem', '2rem']}
        spacing="3rem"
      >
        <DataCard
          label={metricHeadings.HEADING_CURRENT_ITERATION}
          value={numberFormat.format(iteration)}
        />
        <DataCard
          label={metricHeadings.HEADING_TOTAL_IMPRESSIONS}
          value={numberFormat.format(totalImpressions)}
        />
        <DataCard
          label={metricHeadings.HEADING_TOTAL_CLICKS}
          value={numberFormat.format(totalClicks)}
        />

        <DataCard
          label={metricHeadings.HEADING_TOTAL_USERS}
          value={numberFormat.format(totalUsers)}
        />
        <DataCard
          label={metricHeadings.HEADING_CTR}
          value={numberFormat.format(totalCTR)}
          helptext={metricHelpText.HELPTEXT_CTR}
        />
        <DataCard
          label={metricHeadings.HEADING_MR_IMPRESSIONS}
          value={numberFormat.format(impressions)}
        />
        <DataCard
          label={metricHeadings.HEADING_MR_CLICKS}
          value={numberFormat.format(clicks)}
        />
        <DataCard
          label={metricHeadings.HEADING_MR_USERS}
          value={numberFormat.format(users)}
        />
        <DataCard
          label={metricHeadings.HEADING_MR_CTR}
          value={numberFormat.format(ctr)}
          helptext={metricHelpText.HELPTEXT_CTR}
        />
      </SimpleGrid>
    </Flex>
  )
}

Dashboard.defaultProps = {
  campaignName: '',
  campaignId: null,
}

Dashboard.propTypes = {
  campaignName: PropTypes.string,
  campaignId: PropTypes.number,
}

export default Dashboard
