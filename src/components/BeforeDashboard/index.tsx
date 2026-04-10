import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to Revnator CMS</h4>
      </Banner>
      <p>Use the sidebar to manage your website content.</p>
    </div>
  )
}

export default BeforeDashboard
