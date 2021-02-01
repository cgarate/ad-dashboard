import { Box, Container, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import Dashboard from './components/Dashboard/Dashboard'
import HeaderApp from './components/HeaderApp'
import { ENDPOINT_CAMPAIGNS } from './constants'

const App = () => {
  const [campaigns, setCampaigns] = useState([])
  const [campaignSelected, setCampaignSelected] = useState(null)

  // Load the list of campaigns
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

  // Handle the campaign selector
  const handleCampaignSelection = (event) => {
    setCampaignSelected(campaigns[event.target.value])
  }

  return (
    <Box as="main">
      <Flex flexDirection="column" margin="1rem 3rem">
        <HeaderApp
          handleCampaignSelection={handleCampaignSelection}
          campaigns={campaigns}
        />
        {campaignSelected && (
          <Container
            margin="0"
            maxWidth="inherit"
            border="1px dashed teal"
            marginTop="3rem"
          >
            <Dashboard
              campaignId={campaignSelected.id}
              campaignName={campaignSelected.name}
            />
          </Container>
        )}
      </Flex>
    </Box>
  )
}

export default App
