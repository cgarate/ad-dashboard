import React from 'react'
import { useQuery } from 'react-query'
import {
  Flex,
  Heading,
  SimpleGrid,
  Tag,
  TagLabel,
  Skeleton,
  Container,
  Text,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { metricHeadings, metricHelpText } from '../../constants'
import { calculateCTR } from '../../utils'
import DataCard from './DataCard'
import { fetchCampaignById } from '../../api'

// eslint-disable-next-line no-unused-vars
const Dashboard = ({ campaignId, campaignName }) => {
  

  // const [iteration, setIteration] = useState(1)
  const useCampaign = (id, num) =>
    useQuery(['campaignData', id, num], () => fetchCampaignById(id, num), {
      enabled: !!id,
      // refetchInterval: 5000,
      notifyOnChangeProps: 'tracked',
      // onSuccess: () => increaseIteration(),
    })

  // eslint-disable-next-line no-unused-vars
  const { isLoading, isError, data, isFetching, refetch } = useCampaign(
    campaignId,
    1
  )
  if (isError) {
    return (
      <Container>
        <Text>An error has occurred</Text>
      </Container>
    )
  }

  const { clicks, impressions, users } = data || {}

  const clickThroughRate = calculateCTR(clicks, impressions)
  return (
    <Skeleton isLoaded={!isLoading}>
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
          minChildWidth={['100px', '120px', '200px', '200px']}
          padding={['1rem', '1rem', '2rem']}
          spacing="3rem"
        >
          <DataCard
            label={metricHeadings.HEADING_TOTAL_IMPRESSIONS}
            value={impressions}
          />
          <DataCard
            label={metricHeadings.HEADING_TOTAL_CLICKS}
            value={clicks}
          />
          <DataCard
            label={metricHeadings.HEADING_CTR}
            value={clickThroughRate}
            helptext={metricHelpText.HELPTEXT_CTR}
          />
          <DataCard label={metricHeadings.HEADING_TOTAL_USERS} value={users} />
          <DataCard
            label={metricHeadings.HEADING_CURRENT_ITERATION}
            value={impressions}
          />
          <DataCard
            label={metricHeadings.HEADING_MR_IMPRESSIONS}
            value={impressions}
          />
          <DataCard
            label={metricHeadings.HEADING_MR_CLICKS}
            value={impressions}
          />
          <DataCard label={metricHeadings.HEADING_MR_CTR} value={impressions} />
          <DataCard
            label={metricHeadings.HEADING_MR_USERS}
            value={impressions}
          />
        </SimpleGrid>
      </Flex>
    </Skeleton>
  )
}

Dashboard.defaultProps = {
  campaignId: -1,
  campaignName: '',
}

Dashboard.propTypes = {
  campaignId: PropTypes.string,
  campaignName: PropTypes.string,
}

export default Dashboard
