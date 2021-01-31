import React, { useEffect, useState } from 'react'
import { Box, Container, Flex } from '@chakra-ui/react'

import { ENDPOINT_CAMPAIGNS } from './constants'
import Dashboard from './components/Dashboard/Dashboard'
import HeaderApp from './components/HeaderApp'

const App = () => {
  const iteration = 1
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
    fetch(`${ENDPOINT_CAMPAIGNS}/${campaignToFetch.id}?number=${iteration}`)
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
        <HeaderApp handleCampaignSelection={handleCampaignSelection} campaigns={campaigns} />
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
