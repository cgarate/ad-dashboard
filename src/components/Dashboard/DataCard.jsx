import React from 'react'
import PropTypes from 'prop-types'
import { Stat, StatLabel, StatNumber, Tooltip } from '@chakra-ui/react'
import { IoMdHelpCircle } from 'react-icons/io'

const DataCard = ({ label, value, helptext }) => (
  <Stat padding="1rem" border="1px solid #dddddd" borderRadius="12px" size="md">
    <StatLabel display="flex" fontWeight="bold" color="#0aadff">
      {label}
      {helptext && (
        <Tooltip label={helptext} bg="gray.600" aria-label={helptext}>
          <span>
            <IoMdHelpCircle fontSize="18px" />
          </span>
        </Tooltip>
      )}
    </StatLabel>
    <StatNumber>{value}</StatNumber>
  </Stat>
)

DataCard.defaultProps = {
  label: '',
  value: '',
  helptext: '',
}

DataCard.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  helptext: PropTypes.string,
}

export default DataCard
