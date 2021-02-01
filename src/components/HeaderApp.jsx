import React from 'react'
import PropTypes from 'prop-types'
import { Box, Select, Heading, Flex } from '@chakra-ui/react'
import { RiAdvertisementFill } from 'react-icons/ri'

const HeaderApp = ({ handleCampaignSelection, campaigns }) => (
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
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          {campaign.id} {campaign.name}
        </option>
      ))}
    </Select>
  </Box>
)

HeaderApp.defaultProps = {
  handleCampaignSelection: () => {},
  campaigns: [],
}

HeaderApp.propTypes = {
  handleCampaignSelection: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  campaigns: PropTypes.array,
}

export default HeaderApp
