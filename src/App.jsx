/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Select,
  Skeleton,
} from '@chakra-ui/react'

import { RiAdvertisementFill } from 'react-icons/ri'
import { useQuery } from 'react-query'

import { fetchCampaigns } from './api'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => {
  const [campaignId, setCampaignId] = useState(null)
  const [campaignName, setCampaignName] = useState(null)

  const handleCampaignSelection = (event) => {
    setCampaignId(event.target.value)
    setCampaignName(event.target.selectedOptions[0].label)
  }

  // Bring the campaign data
  const { isLoading, isError, data, error } = useQuery(
    'campaigns',
    fetchCampaigns
  )

  // eslint-disable-next-line react/no-children-prop
  if (isError) {
    // eslint-disable-next-line no-console
    console.log('Error', error)
    return <Box>An Error Occurred</Box>
  }

  return (
    <Box as="main">
      <Flex flexDirection="column" margin="1rem 3rem">
        <Box maxWidth={['100%', '100%', '50%', '50%', '25%']}>
          <Flex justifyContent="flex-start" alignItems="center">
            <RiAdvertisementFill fontSize="44px" color="#ff8300" />
            <Heading marginLeft="0.4rem">Campaign App</Heading>
          </Flex>
          <Skeleton isLoaded={!isLoading}>
            <Select
              marginTop="2rem"
              variant="flushed"
              placeholder="Select campaign"
              onChange={handleCampaignSelection}
            >
              {data &&
                data.campaigns.map((campaign) => (
                  <option
                    key={`campaign-${campaign.name}-${campaign.id}`}
                    value={campaign.id}
                  >
                    {campaign.name}
                  </option>
                ))}
            </Select>
          </Skeleton>
        </Box>
        {campaignId && (
          <Container
            margin="0"
            maxWidth="inherit"
            border="1px dashed teal"
            marginTop="3rem"
          >
            <Dashboard
              campaignId={campaignId}
              campaignName={campaignName}
            />
          </Container>
        )}
      </Flex>
    </Box>
  )
}

export default App
