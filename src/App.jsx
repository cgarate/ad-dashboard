import React, { useEffect, useState } from 'react'
import { Box, Container, Flex, Heading, Select } from '@chakra-ui/react'
import { RiAdvertisementFill } from 'react-icons/ri'

import { ENDPOINT_CAMPAIGNS } from './constants'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => {
  const [campaigns, setCampaigns] = useState([])
  const [campaignSelected, setCampaignSelected] = useState(null)
  const [currentDashboardData, setCurrentDashboardData] = useState(null)
  // const queryClient = useQueryClient();

  // Bring the campaign data
  useEffect(() => {
    fetch(ENDPOINT_CAMPAIGNS)
      .then((apiResponse) => apiResponse.json())
      .then((data) => {
        setCampaigns(data.campaigns)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('ERROR IN API CALL: ', error)
      })
  }, [])

  const handleCampaignSelection = (event) => {
    const campaignToFetch = campaigns[event.target.value]
    setCampaignSelected(campaignToFetch)
    fetch(`${ENDPOINT_CAMPAIGNS}/${campaignToFetch.id}?number=0`)
      .then((response) => response.json())
      .then((data) => setCurrentDashboardData(data))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('ERROR IN API CALL: ', error)
      })
  }

  return (
    <Box as="main">
      <Flex flexDirection="column" margin="1rem 3rem">
        <Box maxWidth={['100%', '100%', '50%', '50%', '25%']}>
          <Flex justifyContent="flex-start" alignItems="center">
            <RiAdvertisementFill fontSize="44px" color="#ff8300" />
            <Heading marginLeft="0.4rem">Campaign App</Heading>
          </Flex>
          <Select
            marginTop="2rem"
            variant="flushed"
            placeholder="Select campaign"
            onChange={handleCampaignSelection}
          >
            {campaigns.map((campaign) => (
              <option
                key={`campaign-${campaign.name}-${campaign.id}`}
                value={campaign.id}
              >
                {campaign.name}
              </option>
            ))}
          </Select>
        </Box>
        <Container
          margin="0"
          maxWidth="inherit"
          border="1px dashed teal"
          marginTop="3rem"
        >
          <Dashboard
            campaignName={campaignSelected && campaignSelected.name}
            dashboardData={currentDashboardData}
          />
        </Container>
      </Flex>
    </Box>
  )
}

export default App
