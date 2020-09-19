import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://github.com/liang-faan" target="_blank" rel="noopener noreferrer">Github</a>
        <span className="ml-1">&copy; liang-faan.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://github.com/liang-faan" target="_blank" rel="noopener noreferrer">Liang Faan</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
